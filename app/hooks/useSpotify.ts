import { useQuery } from "@tanstack/react-query";
import {
  getFollowed,
  getPlaylist,
  getTopArtists,
  getTopTracks,
} from "../services/spotifyService";
import { PlaylistResponse } from "../types/spotify";

// Hook to get a playlist
export const usePlaylist = () => {
  return useQuery<PlaylistResponse>({
    queryKey: ["playlist"],
    queryFn: getPlaylist,
  });
};

// Hook to get a top artists
export const useTopArtists = () => {
  return useQuery({
    queryKey: ["top-artists"],
    queryFn: getTopArtists,
  });
};

// Hook to get a top tracks
export const useTopTracks = () => {
  return useQuery({
    queryKey: ["top-tracks"],
    queryFn: getTopTracks,
  });
};

// Hook to get a followed artist
export const useFollowed = () => {
  return useQuery({
    queryKey: ["followed"],
    queryFn: getFollowed,
  });
};
