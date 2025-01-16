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

export type TopArtist = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
  type: string;
};

export type TopTrack = {
  id: string;
  name: string;
  album: {
    images: Array<{ url: string }>;
  };
  artists: Array<{ name: string }>;
  external_urls: { spotify: string };
};
