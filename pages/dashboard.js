import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { role } = router.query;
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!role) return;
    fetch(`/api/getVault?role=${role}`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, [role]);

  if (!role) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-pink-400 to-purple-600 text-white">
      <h1 className="text-3xl font-bold mb-6">
        سلام {role === "guest" ? "مهمان عزیز" : role === "mahyar" ? "مهیار" : "آرام"} 💌
      </h1>

      {role === "guest" ? (
        <p>اینجا بخش عمومی است. بخش خصوصی فقط برای مهیار و آرام قابل دسترسی است.</p>
      ) : (
        <>
          <h2 className="text-xl mb-4">📦 صندوقچه شما</h2>
          <ul>
            {items.map((item, i) => (
              <li key={i} className="mb-2 bg-white/20 p-2 rounded">
                {item.type === "text" ? item.content : <a href={item.url} target="_blank">📎 فایل</a>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
