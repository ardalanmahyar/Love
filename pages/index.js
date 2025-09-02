import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (user === "guest") {
      router.push("/dashboard?role=guest");
    } else if ((user === "mahyar" || user === "aram") && password === "07081206") {
      router.push(`/dashboard?role=${user}`);
    } else {
      alert("رمز یا کاربر درست نیست!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-8">🌹 صندوقچه عشق 🌹</h1>
      <div className="bg-white/20 p-6 rounded-2xl shadow-xl">
        <select
          className="p-2 rounded text-black"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="">-- انتخاب کاربر --</option>
          <option value="mahyar">مهیار</option>
          <option value="aram">آرام</option>
          <option value="guest">مهمان</option>
        </select>
        {user !== "guest" && (
          <input
            type="password"
            placeholder="رمز عبور"
            className="p-2 rounded text-black block mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <button
          onClick={handleLogin}
          className="mt-4 px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700"
        >
          ورود
        </button>
      </div>
    </div>
  );
}
