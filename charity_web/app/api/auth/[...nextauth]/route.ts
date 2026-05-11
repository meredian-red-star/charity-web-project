import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";
import path from "path";

// 1. Konek langsung ke file database SQLite yang udah ada
const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // 2. Pakai Raw SQL buat nyari user berdasarkan email
        const stmt = db.prepare('SELECT * FROM User WHERE email = ?');
        const user = stmt.get(credentials.email) as any;

        if (!user || !user.password) return null;

        // 3. Cek kecocokan password
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) return null;

        // 4. Return data user
        return { 
          id: user.id.toString(), 
          name: user.name, 
          email: user.email, 
          role: user.role 
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: { strategy: "jwt" }
});

export { handler as GET, handler as POST };