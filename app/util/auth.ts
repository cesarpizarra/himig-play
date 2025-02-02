import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function getAuthenticatedSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session.token || !session.token.access_token) {
    throw new Error("Not authenticated");
  }

  return session.token.access_token;
}
