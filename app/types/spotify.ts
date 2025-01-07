export type PlaylistItem = {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
};

export type PlaylistResponse = {
  items: PlaylistItem[];
  total: number;
};
