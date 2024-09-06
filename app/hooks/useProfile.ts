import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Profile } from "../types/profile";

export function useProfile() {
  const { data, isLoading, error } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axios.get<Profile>("/api/spotify/me");
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
}
