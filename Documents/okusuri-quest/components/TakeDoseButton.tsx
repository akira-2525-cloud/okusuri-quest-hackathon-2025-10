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

  return (
    <button 
      onClick={click} 
      disabled={pending}
      className={`
        relative overflow-hidden
        px-8 py-4 
        bg-gradient-to-r from-blue-500 to-purple-600 
        hover:from-blue-600 hover:to-purple-700
        disabled:from-gray-400 disabled:to-gray-500
        text-white font-semibold text-lg
        rounded-xl shadow-lg hover:shadow-xl
        transform hover:scale-105 active:scale-95
        transition-all duration-200 ease-out
        disabled:transform-none disabled:cursor-not-allowed
        border border-white/20
        backdrop-blur-sm
        ${pending ? 'animate-pulse' : ''}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {pending ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            処理中...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            今日の服薬
          </>
        )}
      </span>
      
      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
    </button>
  );
}
