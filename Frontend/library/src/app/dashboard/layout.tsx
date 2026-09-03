import { verifySession, hasRole, ADMIN_ROLE } from "@/lib/dal";
import { getClaim, CLAIM_TYPE_NAME } from "@/lib/jwt";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  const isAdmin = hasRole(session, ADMIN_ROLE);
  const displayName =
    getClaim(session.payload, "sub", "username", CLAIM_TYPE_NAME) ?? "user";

  return (
    <DashboardShell isAdmin={isAdmin} displayName={displayName}>
      {children}
    </DashboardShell>
  );
}
