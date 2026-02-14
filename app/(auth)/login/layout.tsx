// app/layout.tsx
import type { Metadata } from "next"
import "@/app/globals.css"
import { createClient } from "@/lib/supabase/server"
import { getUserProfile } from "@/lib/auth/get-user-profile"
import { PROTECTED_ROUTES } from "@/constants/routes"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Internal administration panel",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const result = await getUserProfile({
    supabaseClient: supabase,
  })

  if (result.ok) {
    redirect(PROTECTED_ROUTES.DASHBOARD)
  }

  return (
    <html lang="en">
      <body>
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  )
}
