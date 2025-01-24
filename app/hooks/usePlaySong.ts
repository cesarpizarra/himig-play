import { useState } from "react";
import { playSong } from "@/app/services/spotifyService";
const usePlaySong = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlay = async (songUri: any) => {
    setLoading(true);
    setError(null);

    try {
      await playSong(songUri);
    } catch (err: any) {
      console.error("Failed to play song:", err);
      setError("Failed to play song");
    } finally {
      setLoading(false);
    }
  };

  return { handlePlay, loading, error };
};

export default usePlaySong;
