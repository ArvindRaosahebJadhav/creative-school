import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import db from "../db/database.js";
import { Achievement } from "../types/index.js";
import { UPLOADS_DIR } from "../middleware/upload.middleware.js";

export function getAll(_req: Request, res: Response): void {
  const rows = db
    .prepare("SELECT * FROM achievements ORDER BY date DESC")
    .all() as Achievement[];
  res.json(rows);
}

export function create(req: Request, res: Response): void {
  const { title, student_name, description, date } = req.body as Pick<
    Achievement,
    "title" | "student_name" | "description" | "date"
  >;

  if (!title || !student_name || !date) {
    res
      .status(400)
      .json({ error: "title, student_name and date are required" });
    return;
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const result = db
    .prepare(
      "INSERT INTO achievements (title, student_name, description, date, image_url) VALUES (?, ?, ?, ?, ?)",
    )
    .run(title, student_name, description ?? null, date, imageUrl);

  res.status(201).json({ id: result.lastInsertRowid });
}

export function update(req: Request, res: Response): void {
  const { id } = req.params;
  const { title, student_name, description, date } =
    req.body as Partial<Achievement>;

  const existing = db
    .prepare("SELECT * FROM achievements WHERE id = ?")
    .get(id) as Achievement | undefined;

  if (!existing) {
    res.status(404).json({ error: "Achievement not found" });
    return;
  }

  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : existing.image_url;

  if (req.file && existing.image_url?.startsWith("/uploads")) {
    const oldPath = path.join(UPLOADS_DIR, path.basename(existing.image_url));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  db.prepare(
    "UPDATE achievements SET title = ?, student_name = ?, description = ?, date = ?, image_url = ? WHERE id = ?",
  ).run(
    title ?? existing.title,
    student_name ?? existing.student_name,
    description ?? existing.description,
    date ?? existing.date,
    imageUrl,
    id,
  );

  res.json({ success: true });
}

export function remove(req: Request, res: Response): void {
  const { id } = req.params;
  const existing = db
    .prepare("SELECT * FROM achievements WHERE id = ?")
    .get(id) as Achievement | undefined;

  if (!existing) {
    res.status(404).json({ error: "Achievement not found" });
    return;
  }

  if (existing.image_url?.startsWith("/uploads")) {
    const filePath = path.join(UPLOADS_DIR, path.basename(existing.image_url));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  db.prepare("DELETE FROM achievements WHERE id = ?").run(id);
  res.json({ success: true });
}
