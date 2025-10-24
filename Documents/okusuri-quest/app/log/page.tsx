"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Row = { taken_at: string };

export default function Page(){
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("doses").select("taken_at")
        .eq("user_id", user.id).order("taken_at", { ascending: false });
      setRows(data ?? []);
    })();
  }, []);
  return (
    <main style={{maxWidth:720, margin:"40px auto"}}>
      <h1>ログ</h1>
      <ul>{rows.map((r,i)=><li key={i}>{r.taken_at}</li>)}</ul>
    </main>
  );
}
