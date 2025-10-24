"use client";
import { useState } from "react";
import { supabase } from "../app/lib/supabase";

export default function TakeDoseButton({ onTaken }:{ onTaken: ()=>void }) {
  const [pending, setPending] = useState(false);

  const click = async () => {
    if (pending) return;
    setPending(true);
    try {
      const { data: { user }, error: uerr } = await supabase.auth.getUser();
      if (uerr || !user) { console.warn(uerr); setPending(false); return; }

      // 既存の最初の薬を取得 or 作成
      const { data: meds } = await supabase.from("meds").select("id").limit(1);
      let medId = (meds && meds[0]?.id) as string | undefined;

      if (!medId) {
        const { data: m, error: merr } = await supabase.from("meds").insert({
          user_id: user.id, name: "DemoMed", dosage_per_day: 1
        }).select("id").single();
        if (merr) { console.warn(merr); setPending(false); return; }
        medId = m!.id;
        await supabase.from("plans").insert({ user_id: user.id, med_id: medId, times_per_day: 1 });
      }

      // doses 追加（同日重複=23505は無音でOK）
      const { error: derr } = await supabase.from("doses")
        .insert({ user_id: user.id, med_id: medId });
      if (derr && (derr as any).code !== "23505") console.warn(derr);
      onTaken();
    } finally {
      setPending(false);
    }
  };

  return <button onClick={click} disabled={pending}>今日の服薬</button>;
}
