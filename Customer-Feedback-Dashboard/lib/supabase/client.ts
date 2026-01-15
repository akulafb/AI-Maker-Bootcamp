import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !anonKey) {
      console.error("[v0] Supabase config missing:", {
        hasUrl: !!url,
        hasAnonKey: !!anonKey,
        urlPrefix: url?.substring(0, 20),
      })
      throw new Error(
        `Supabase configuration is incomplete. URL: ${!!url}, Key: ${!!anonKey}. Check your environment variables.`,
      )
    }

    supabaseClient = createBrowserClient(url, anonKey)
  }
  return supabaseClient
}
