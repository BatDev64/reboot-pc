// app/(dashboard)/layout.tsx

import { guardProfile } from "@/lib/auth/guards/guard-profile"
import { getUserProfile } from "@/lib/auth/get-user-profile"
import { createClient } from "@/lib/supabase/server"
import { logoutAction } from "../(auth)/login/actions"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseClient = await createClient()

  const result = await getUserProfile({ supabaseClient })

  guardProfile({
    result,
    requirements: {
      requireActive: true,
    },
  })

  return (
    <html lang="en">
      <body>
        <div>
          <form action={logoutAction}>
            <button>Logut</button>
          </form>
        </div>
        <main>{children}</main>
      </body>
    </html>
  )
}
