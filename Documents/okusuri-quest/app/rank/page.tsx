"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRankRefetch } from "../../components/useRankRefetch";

type RankRow = { rank:number; nickname:string; adherence_pct:number };

export default function Page(){
  const [rows, setRows] = useState<RankRow[]>([]);
  const fetchRank = useCallback(async () => {
    const { data, error } = await supabase.rpc("get_public_rank");
    if (!error) setRows(data ?? []);
  }, []);
  useEffect(() => { fetchRank(); }, [fetchRank]);
  useRankRefetch(fetchRank);

  return (
    <main style={{maxWidth:720, margin:"40px auto"}}>
      <h1>週次ランキング</h1>
      <ol>{rows.map((r)=><li key={r.rank}>#{r.rank} {r.nickname} / {r.adherence_pct}%</li>)}</ol>
    </main>
  );
}
