import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import db from "../db/database.js";
import { Event } from "../types/index.js";
import { UPLOADS_DIR } from "../middleware/upload.middleware.js";

export function getAll(_req: Request, res: Response): void {
  const rows = db
    .prepare("SELECT * FROM events ORDER BY date DESC")
    .all() as Event[];
  res.json(rows);
}

export function create(req: Request, res: Response): void {
  const { title, description, date, location } = req.body as Pick<
    Event,
    "title" | "description" | "date" | "location"
  >;

  if (!title || !date) {
    res.status(400).json({ error: "title and date are required" });
    return;
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const result = db
    .prepare(
      "INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?)",
    )
    .run(title, description ?? null, date, location ?? null, imageUrl);

  res.status(201).json({ id: result.lastInsertRowid });
}

export function update(req: Request, res: Response): void {
  const { id } = req.params;
  const { title, description, date, location } = req.body as Partial<Event>;

  const existing = db.prepare("SELECT * FROM events WHERE id = ?").get(id) as
    | Event
    | undefined;
  if (!existing) {
    res.status(404).json({ error: "Event not found" });
    return;
  }

  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : existing.image_url;

  // Remove old image file if replaced
  if (req.file && existing.image_url?.startsWith("/uploads")) {
    const oldPath = path.join(UPLOADS_DIR, path.basename(existing.image_url));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  db.prepare(
    "UPDATE events SET title = ?, description = ?, date = ?, location = ?, image_url = ? WHERE id = ?",
  ).run(
    title ?? existing.title,
    description ?? existing.description,
    date ?? existing.date,
    location ?? existing.location,
    imageUrl,
    id,
  );

  res.json({ success: true });
}

export function remove(req: Request, res: Response): void {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM events WHERE id = ?").get(id) as
    | Event
    | undefined;

  if (!existing) {
    res.status(404).json({ error: "Event not found" });
    return;
  }

  if (existing.image_url?.startsWith("/uploads")) {
    const filePath = path.join(UPLOADS_DIR, path.basename(existing.image_url));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  db.prepare("DELETE FROM events WHERE id = ?").run(id);
  res.json({ success: true });
}
