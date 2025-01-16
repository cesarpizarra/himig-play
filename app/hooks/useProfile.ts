import { useQuery } from "@tanstack/react-query";
import { Profile } from "../types/profile";
import { getProfile } from "../services/userService";

// Hook to get user profile
export const useProfile = () => {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
