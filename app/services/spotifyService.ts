import axiosInstance from "../axios/axiosIntstance";
import { PlaylistResponse, TopArtist, TopTrack } from "../types/spotify";

export const getPlaylist = async () => {
  try {
    const response = await axiosInstance.get<PlaylistResponse>(
      "/api/spotify/playlist",
    );
    return response.data;
  } catch (error) {
    console.error("Error getting playlist", error);
    throw error;
  }
};

export const getTopArtists = async () => {
  try {
    const response = await axiosInstance.get<TopArtist[]>("/api/spotify/top");
    return response.data;
  } catch (error) {
    console.error("Error getting top artists", error);
    throw error;
  }
};

export const getTopTracks = async () => {
  try {
    const response = await axiosInstance.get<TopTrack[]>(
      "/api/spotify/top/tracks",
    );
    return response.data;
  } catch (error) {
    console.error("Error getting top tracks", error);
    throw error;
  }
};

export const getFollowed = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/following");
    return response.data;
  } catch (error) {
    console.error("Error getting top tracks", error);
    throw error;
  }
};
