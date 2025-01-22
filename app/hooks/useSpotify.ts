import { useQuery } from "@tanstack/react-query";
import {
  getAlbumById,
  getAlbums,
  getArtistAlbum,
  getCurrentPlaying,
  getFollowed,
  getNewReleases,
  getPlaylist,
  getPlaylistById,
  getRecentlyPlayed,
  getTop3Artists,
  getTopArtists,
  getTopTracks,
  getTracks,
} from "../services/spotifyService";
import {
  AlbumById,
  AlbumResponse,
  CurrentPlayingTrack,
  LikeSongsResponse,
  PlaylistById,
  PlaylistResponse,
  TopArtist,
  TopTrack,
} from "../types/spotify";

// Hook to get a playlist
export const usePlaylist = () => {
  return useQuery<PlaylistResponse>({
    queryKey: ["playlist"],
    queryFn: getPlaylist,
  });
};

// Hook to get a album by id
export const useAlbum = (id: string) => {
  return useQuery<AlbumById>({
    queryKey: ["album", id],
    queryFn: () => getAlbumById(id),
  });
};

// Hook to get a album of artist
export const useArtistAlbum = (id: string) => {
  return useQuery({
    queryKey: ["artist-album", id],
    queryFn: () => getArtistAlbum(id),
  });
};

// Hook to get a playlist by id
export const usePlaylistById = (id: string) => {
  return useQuery<PlaylistById>({
    queryKey: ["playlist", id],
    queryFn: () => getPlaylistById(id),
  });
};

// Hook to get a top 3 artists
export const useTop3Artists = () => {
  return useQuery<TopArtist[]>({
    queryKey: ["top3-artists"],
    queryFn: getTop3Artists,
  });
};

// Hook to get a top tracks
export const useTopTracks = () => {
  return useQuery<TopTrack[]>({
    queryKey: ["top-tracks"],
    queryFn: getTopTracks,
  });
};

// Hook to get a followed artist
export const useFollowed = () => {
  return useQuery<TopArtist[]>({
    queryKey: ["followed"],
    queryFn: getFollowed,
  });
};

// Hook to get a current playing
export const useCurrentPlaying = () => {
  return useQuery<CurrentPlayingTrack>({
    queryKey: ["current-playing"],
    queryFn: getCurrentPlaying,
  });
};

// Hook to get a albums
export const useAlbums = () => {
  return useQuery<AlbumResponse>({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });
};

// Hook to get a tracks
export const useTracks = () => {
  return useQuery<LikeSongsResponse>({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });
};

// Hook to get a recently played
export const useRecent = () => {
  return useQuery({
    queryKey: ["recent"],
    queryFn: getRecentlyPlayed,
  });
};

// Hook to get a top artists
export const useTopArtists = () => {
  return useQuery<TopArtist[]>({
    queryKey: ["top-artists"],
    queryFn: getTopArtists,
  });
};

// Hook to get a new releases
export const useNewReleases = () => {
  return useQuery<TopArtist[]>({
    queryKey: ["new-releases"],
    queryFn: getNewReleases,
  });
};
