"use client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../lib/supabase";

export default function Page() {
  return (
    <main style={{maxWidth:420, margin:"48px auto"}}>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} view="magic_link" />
    </main>
  );
}
