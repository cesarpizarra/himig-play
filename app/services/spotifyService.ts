import axiosInstance from "../axios/axiosIntstance";

export const getPlaylist = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/playlist");
    return response.data;
  } catch (error) {
    console.error("Error getting playlist", error);
    throw error;
  }
};

export const getTop3Artists = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/top");
    return response.data;
  } catch (error) {
    console.error("Error getting top artists", error);
    throw error;
  }
};

export const getTopTracks = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/top/tracks");
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

export const getCurrentPlaying = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/playing");
    return response.data;
  } catch (error) {
    console.error("Error getting current playing", error);
    throw error;
  }
};

export const getAlbums = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/albums");
    return response.data;
  } catch (error) {
    console.error("Error getting albums", error);
    throw error;
  }
};

export const getTracks = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/tracks");
    return response.data;
  } catch (error) {
    console.error("Error getting tracks", error);
    throw error;
  }
};

export const getRecentlyPlayed = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/recently-played");
    return response.data;
  } catch (error) {
    console.error("Error getting recently played", error);
    throw error;
  }
};

export const getTopArtists = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/top/artists");
    return response.data;
  } catch (error) {
    console.error("Error getting recently played", error);
    throw error;
  }
};

export const getNewReleases = async () => {
  try {
    const response = await axiosInstance.get("/api/spotify/new-releases");
    return response.data;
  } catch (error) {
    console.error("Error getting recently played", error);
    throw error;
  }
};

export const getAlbumById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/spotify/albums/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting album", error);
    throw error;
  }
};

export const getArtistAlbum = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/spotify/artist/album/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting album", error);
    throw error;
  }
};

export const getPlaylistById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/spotify/playlist/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting album", error);
    throw error;
  }
};

// Service function to play a song
export const playSong = async (songUri: string) => {
  try {
    const response = await axiosInstance.post("/api/spotify/play", { songUri });
    return response.data;
  } catch (error) {
    console.error("Error playing song:", error);
    throw error;
  }
};

// Service function to search
export const search = async (searchText: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/spotify/search?q=${encodeURIComponent(searchText)}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error searching", error);
    throw error;
  }
};
