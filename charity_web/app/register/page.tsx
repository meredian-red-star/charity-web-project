"use client"; // Wajib buat komponen form di Next.js

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DONATUR",
  });
  const [pesan, setPesan] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesan("Lagi diproses...");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setPesan("Mantap! Akun berhasil dibikin. Bentar lagi dipindah ke halaman Login...");
      setTimeout(() => {
        router.push("/api/auth/signin"); // Otomatis pindah ke halaman login
      }, 2000);
    } else {
      setPesan("Gagal bikin akun. Cek lagi datanya.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Daftar Akun Charity</h1>
        
        {pesan && <p className="mb-4 text-center text-sm font-semibold text-blue-600">{pesan}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          <select 
            className="p-2 border rounded bg-white"
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            value={formData.role}
          >
            <option value="DONATUR">Donatur</option>
            <option value="CAMPAIGNER">Campaigner</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">
            Daftar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}