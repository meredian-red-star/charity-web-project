import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";
import path from "path";
import { randomUUID } from "crypto";

// Konek ke database SQLite yang sama
const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    // Validasi simpel biar nggak kosong
    if (!email || !password) {
      return NextResponse.json({ message: "Email dan password wajib diisi, bro!" }, { status: 400 });
    }

    // Hash password (nilai plus buat security pas dinilai dosen)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Siapin data default
    const id = randomUUID();
    const userRole = role || "DONATUR"; // Kalau nggak diisi, otomatis jadi donatur
    const now = new Date().toISOString();

    // Masukin data ke tabel User pakai Raw SQL
    const stmt = db.prepare(`
      INSERT INTO User (id, name, email, password, role, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, name, email, hashedPassword, userRole, now, now);

    return NextResponse.json({ message: "Akun berhasil didaftarkan!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal bikin akun. Bisa jadi email lu udah kepakai." }, { status: 500 });
  }
}