import axiosInstance from "../axios/axiosIntstance";
import { Profile } from "../types/profile";

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get<Profile>("/api/spotify/me");
    return response.data;
  } catch (error) {
    console.error("Error getting profile", error);
    throw error;
  }
};
