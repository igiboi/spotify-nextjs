import { useSession, signIn } from "next-auth/react";
import { SubresourceIntegrityPlugin } from "next/dist/build/webpack/plugins/subresource-integrity-plugin";
import { useEffect } from "react";
import spotifyApi from "../lib/spotify";

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessToken") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accesstoken);
    }
  }, [session]);

  return null;
}

export default useSpotify;
