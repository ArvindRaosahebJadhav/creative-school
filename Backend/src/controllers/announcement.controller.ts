import { Request, Response } from "express";
import db from "../db/database.js";
import { Announcement } from "../types/index.js";

export function getAll(_req: Request, res: Response): void {
  const rows = db
    .prepare("SELECT * FROM announcements ORDER BY date DESC")
    .all() as Announcement[];
  res.json(rows);
}

export function create(req: Request, res: Response): void {
  const { title, content, date } = req.body as Pick<
    Announcement,
    "title" | "content" | "date"
  >;

  if (!title || !content || !date) {
    res.status(400).json({ error: "title, content and date are required" });
    return;
  }

  const result = db
    .prepare(
      "INSERT INTO announcements (title, content, date) VALUES (?, ?, ?)",
    )
    .run(title, content, date);

  res.status(201).json({ id: result.lastInsertRowid });
}

export function update(req: Request, res: Response): void {
  const { id } = req.params;
  const { title, content, date, is_active } = req.body as Partial<Announcement>;

  const existing = db
    .prepare("SELECT id FROM announcements WHERE id = ?")
    .get(id);
  if (!existing) {
    res.status(404).json({ error: "Announcement not found" });
    return;
  }

  db.prepare(
    "UPDATE announcements SET title = COALESCE(?, title), content = COALESCE(?, content), date = COALESCE(?, date), is_active = COALESCE(?, is_active) WHERE id = ?",
  ).run(title ?? null, content ?? null, date ?? null, is_active ?? null, id);

  res.json({ success: true });
}

export function remove(req: Request, res: Response): void {
  const { id } = req.params;

  const existing = db
    .prepare("SELECT id FROM announcements WHERE id = ?")
    .get(id);
  if (!existing) {
    res.status(404).json({ error: "Announcement not found" });
    return;
  }

  db.prepare("DELETE FROM announcements WHERE id = ?").run(id);
  res.json({ success: true });
}
