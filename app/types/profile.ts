export type Profile = {
  display_name: string;
  email: string;
  followers: {
    href: string;
    total: number;
  };
  images: Array<{ url: string }>;
};
