import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import axios from "axios";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Check if the session exists and if there is an access token
  if (!session || !session.token || !session.token.access_token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Make a request to the Spotify API using Axios
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${session.token.access_token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching Spotify data:",
      error.response?.data || error.message,
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
