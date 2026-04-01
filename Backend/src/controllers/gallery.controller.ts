// import db from "../config/db.js";

// export const getGallery = (req, res) => {
//   const data = db.prepare("SELECT * FROM gallery").all();
//   res.json(data);
// };

// export const createGallery = (req, res) => {
//   const { title, type, category, videoUrl } = req.body;
//   const url = type === "photo" ? `/uploads/${req.file?.filename}` : videoUrl;

//   const result = db
//     .prepare(
//       "INSERT INTO gallery (title, type, url, category) VALUES (?, ?, ?, ?)",
//     )
//     .run(title, type, url, category);

//   res.json({ id: result.lastInsertRowid });
// };

import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import db from "../db/database.js";
import { GalleryItem } from "../types/index.js";
import { UPLOADS_DIR } from "../middleware/upload.middleware.js";

export function getAll(_req: Request, res: Response): void {
  const rows = db.prepare("SELECT * FROM gallery").all() as GalleryItem[];
  res.json(rows);
}

export function create(req: Request, res: Response): void {
  const { title, type, category, videoUrl } = req.body as {
    title: string;
    type: "photo" | "video";
    category: string;
    videoUrl?: string;
  };

  if (!title || !type || !category) {
    res.status(400).json({ error: "title, type and category are required" });
    return;
  }

  if (type === "photo" && !req.file) {
    res.status(400).json({ error: "An image file is required for photo type" });
    return;
  }

  if (type === "video" && !videoUrl) {
    res.status(400).json({ error: "videoUrl is required for video type" });
    return;
  }

  const url = type === "photo" ? `/uploads/${req.file!.filename}` : videoUrl!;

  const result = db
    .prepare(
      "INSERT INTO gallery (title, type, url, category) VALUES (?, ?, ?, ?)",
    )
    .run(title, type, url, category);

  res.status(201).json({ id: result.lastInsertRowid });
}

export function update(req: Request, res: Response): void {
  const { id } = req.params;
  const { title, type, category, videoUrl } = req.body as {
    title?: string;
    type?: "photo" | "video";
    category?: string;
    videoUrl?: string;
  };

  const existing = db.prepare("SELECT * FROM gallery WHERE id = ?").get(id) as
    | GalleryItem
    | undefined;
  if (!existing) {
    res.status(404).json({ error: "Gallery item not found" });
    return;
  }

  let url = existing.url;

  if (type === "photo" && req.file) {
    // Delete old file if it was a local upload
    if (existing.url.startsWith("/uploads")) {
      const oldPath = path.join(UPLOADS_DIR, path.basename(existing.url));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    url = `/uploads/${req.file.filename}`;
  } else if (type === "video" && videoUrl) {
    url = videoUrl;
  }

  db.prepare(
    "UPDATE gallery SET title = ?, type = ?, url = ?, category = ? WHERE id = ?",
  ).run(
    title ?? existing.title,
    type ?? existing.type,
    url,
    category ?? existing.category,
    id,
  );

  res.json({ success: true });
}

export function remove(req: Request, res: Response): void {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM gallery WHERE id = ?").get(id) as
    | GalleryItem
    | undefined;

  if (!existing) {
    res.status(404).json({ error: "Gallery item not found" });
    return;
  }

  if (existing.type === "photo" && existing.url.startsWith("/uploads")) {
    const filePath = path.join(UPLOADS_DIR, path.basename(existing.url));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  db.prepare("DELETE FROM gallery WHERE id = ?").run(id);
  res.json({ success: true });
}
