import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import db from "../db/database.js";
import { Teacher } from "../types/index.js";
import { UPLOADS_DIR } from "../middleware/upload.middleware.js";

export function getAll(_req: Request, res: Response): void {
  const rows = db.prepare("SELECT * FROM teachers").all() as Teacher[];
  res.json(rows);
}

export function create(req: Request, res: Response): void {
  const { name, qualification, experience, subject } = req.body as Pick<
    Teacher,
    "name" | "qualification" | "experience" | "subject"
  >;

  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const result = db
    .prepare(
      "INSERT INTO teachers (name, qualification, experience, subject, image_url) VALUES (?, ?, ?, ?, ?)",
    )
    .run(
      name,
      qualification ?? null,
      experience ?? null,
      subject ?? null,
      imageUrl,
    );

  res.status(201).json({ id: result.lastInsertRowid });
}

export function update(req: Request, res: Response): void {
  const { id } = req.params;
  const { name, qualification, experience, subject } =
    req.body as Partial<Teacher>;

  const existing = db.prepare("SELECT * FROM teachers WHERE id = ?").get(id) as
    | Teacher
    | undefined;
  if (!existing) {
    res.status(404).json({ error: "Teacher not found" });
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
    "UPDATE teachers SET name = ?, qualification = ?, experience = ?, subject = ?, image_url = ? WHERE id = ?",
  ).run(
    name ?? existing.name,
    qualification ?? existing.qualification,
    experience ?? existing.experience,
    subject ?? existing.subject,
    imageUrl,
    id,
  );

  res.json({ success: true });
}

export function remove(req: Request, res: Response): void {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM teachers WHERE id = ?").get(id) as
    | Teacher
    | undefined;

  if (!existing) {
    res.status(404).json({ error: "Teacher not found" });
    return;
  }

  if (existing.image_url?.startsWith("/uploads")) {
    const filePath = path.join(UPLOADS_DIR, path.basename(existing.image_url));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  db.prepare("DELETE FROM teachers WHERE id = ?").run(id);
  res.json({ success: true });
}
