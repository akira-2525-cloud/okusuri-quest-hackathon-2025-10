"use client";
import { useEffect } from "react";
import { supabase } from "../app/lib/supabase";

export function useRankRefetch(refetch: () => void) {
  useEffect(() => {
    const ch = supabase
      .channel("rank-signal")
      .on("postgres_changes",
        { event: "*", schema: "public", table: "rank_signals" },
        () => refetch())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [refetch]);
}
