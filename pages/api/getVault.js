import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

export default async function handler(req, res) {
  const { role } = req.query;

  if (!role) return res.status(400).json({ error: "role required" });

  const today = new Date();
  const day = today.getDate();

  let { data, error } = await supabase
    .from("vault_items")
    .select("*")
    .or(`owner.eq.${role},viewer.eq.${role}`);

  if (error) return res.status(500).json({ error: error.message });

  if (day !== 27) {
    data = data.filter((item) => item.owner === role);
  }

  res.json(data);
}
