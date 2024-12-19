import {SupabaseClient} from "@supabase/supabase-js";

export async function getSupabaseClient(): Promise<SupabaseClient> {
    const {user, logout} = useOidcAuth();
    const result = await $fetch('/hono/supabase');
    const accessToken = result.data
    let supabase = new SupabaseClient(
        'https://mfouoyeneddsfujxfjci.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mb3VveWVuZWRkc2Z1anhmamNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTA3NTksImV4cCI6MjA0ODI4Njc1OX0.rNOaQHbi6oJVUa9L4657LtCYEBeCuHZZHTIloF4TpWc',
        {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        }
    );

    return supabase
}