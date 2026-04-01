import { Request, Response } from "express";
import db from "../db/database.js";
import { SchoolInfo, SchoolInfoRow } from "../types/index.js";

export function getInfo(_req: Request, res: Response): void {
  const rows = db.prepare("SELECT * FROM school_info").all() as SchoolInfoRow[];
  const info: SchoolInfo = rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {} as SchoolInfo);
  res.json(info);
}

export function updateInfo(req: Request, res: Response): void {
  const updates = req.body as SchoolInfo;

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    res.status(400).json({ error: "Request body must be a key-value object" });
    return;
  }

  const stmt = db.prepare(
    "INSERT OR REPLACE INTO school_info (key, value) VALUES (?, ?)",
  );

  const transaction = db.transaction((data: SchoolInfo) => {
    for (const [key, value] of Object.entries(data)) {
      stmt.run(key, value);
    }
  });

  transaction(updates);
  res.json({ success: true });
}
