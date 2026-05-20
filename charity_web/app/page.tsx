export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Charity Web</h1>

      <p>
        Platform penggalangan dana online untuk membantu campaign sosial
        secara transparan dan mudah digunakan.
      </p>

      <h2>Campaign Donasi</h2>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          marginTop: "20px",
          maxWidth: "500px",
        }}
      >
        <h3>Bantuan Pendidikan Anak</h3>

        <p>
          Campaign ini bertujuan membantu biaya sekolah anak-anak yang
          membutuhkan.
        </p>

        <p>
          Terkumpul: Rp2.500.000 / Rp5.000.000
        </p>

        <div
          style={{
            backgroundColor: "#eee",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "50%",
              backgroundColor: "#22c55e",
              color: "white",
              padding: "8px",
              textAlign: "center",
            }}
          >
            50%
          </div>
        </div>

        <button
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "white",
          }}
        >
          Donasi Sekarang
        </button>
      </div>
    </main>
  );
}