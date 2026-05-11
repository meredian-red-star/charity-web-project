import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Database from "better-sqlite3";
import path from "path";
import { randomUUID } from "crypto";

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

export async function POST(req: Request) {
  const session = await getServerSession() as any;

  // Cek apakah user sudah login
  if (!session) {
    return NextResponse.json({ message: "Login dulu bos!" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, targetAmount } = body;

    const id = randomUUID();
    const now = new Date().toISOString();
    
    // Ambil ID user dari session (asumsi email unik)
    const user = db.prepare('SELECT id FROM User WHERE email = ?').get(session.user.email) as any;

    const stmt = db.prepare(`
      INSERT INTO Campaign (id, title, description, targetAmount, currentAmount, status, creatorId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, 0, 'PENDING', ?, ?, ?)
    `);

    stmt.run(id, title, description, targetAmount, user.id, now, now);

    return NextResponse.json({ message: "Campaign berhasil diajukan! Tunggu verifikasi admin." }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal bikin campaign." }, { status: 500 });
  }
}