"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import TakeDoseButton from "../../components/TakeDoseButton";

type Streak = { current_days: number; last_taken: string | null };

export default function Page() {
  const [streak, setStreak] = useState<Streak>({ current_days: 0, last_taken: null });

  const refresh = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("streaks").select("current_days,last_taken")
      .eq("user_id", user.id).maybeSingle();
    setStreak({ current_days: data?.current_days ?? 0, last_taken: data?.last_taken ?? null });
  }, []);

  const ensureDemo = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: meds } = await supabase.from("meds").select("id").limit(1);
    if (!meds?.length) {
      const { data: m } = await supabase.from("meds").insert({
        user_id: user.id, name: "DemoMed", dosage_per_day: 1
      }).select("id").single();
      if (m?.id) await supabase.from("plans").insert({ user_id: user.id, med_id: m.id, times_per_day: 1 });
    }
  }, []);

  useEffect(() => { ensureDemo().then(refresh); }, [ensureDemo, refresh]);

  return (
    <main style={{maxWidth:720, margin:"40px auto"}}>
      <h1>ホーム</h1>
      <p>連続日数：<b>{streak.current_days}</b></p>
      <p>最終日：{streak.last_taken ?? "-"}</p>
      <TakeDoseButton onTaken={refresh}/>
    </main>
  );
}
