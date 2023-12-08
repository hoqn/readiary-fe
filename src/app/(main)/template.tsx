import AuthGuardTemplate from "@/app/auth-guard.template";
import ClientTemplate from "./template.client";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuardTemplate>
      <ClientTemplate>{children}</ClientTemplate>
    </AuthGuardTemplate>
  );
}
