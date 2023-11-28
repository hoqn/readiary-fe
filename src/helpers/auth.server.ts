import { AuthSession } from "@/types/auth";
import { decodeJwt } from "@/utils/jwt";
import { cookies } from "next/headers";

export function getServerSession(): AuthSession | null {
  const accessToken = cookies().get("access-token")?.value;

  if (!accessToken)
    return null;
  
  const decoded = decodeJwt(accessToken);

  if (!decoded)
    return null;

  return {
    accessToken,
    user: {
      email: decoded.sub,
      memberId: decoded.memberId
    },
  };
}
