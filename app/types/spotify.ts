export type DefaultItem = {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
  type: string;
  uri: string;
};

export type DefaultItem2 = {
  images: Array<{ url: string }>;
  name: string;
  external_urls: { spotify: string };
  artists: Array<{ name: string }>;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  id: string;
  uri: string;
};

export type PlaylistResponse = {
  items: DefaultItem[];
  total: number;
};

export type AlbumResponse = {
  items: Array<{
    album: DefaultItem2;
  }>;
  total: number;
  offset: number;
};

export type AlbumById = {
  images: Array<{ url: string }>;
  name: string;
  external_urls: { spotify: string };
  artists: Array<{ name: string }>;
  tracks: {
    items: Array<{
      id: string;
      name: string;
      duration_ms: number;
      uri: string;
    }>;
  };
  type: string;
  id: string;
  label: string;
  total_tracks: number;
};

export type PlaylistById = {
  images: Array<{ url: string }>;
  name: string;
  external_urls: { spotify: string };
  artists: Array<{ name: string }>;
  tracks: {
    items: Array<{
      track: {
        album: DefaultItem2;
        id: string;
        name: string;
        duration_ms: number;
        uri: string;
      };
    }>;
  };
  type: string;
  id: string;
};

export type TopArtist = {
  id: string;
  name: string;
  artists: Array<{ name: string; id: string; uri: string }>;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
  type: string;
  uri: string;
};

export type TopTrack = {
  id: string;
  name: string;
  album: {
    images: Array<{ url: string }>;
    name: string;
  };
  artists: Array<{ name: string }>;
  external_urls: { spotify: string };
  duration_ms: number;
  uri: string;
};

export type CurrentPlayingTrack = {
  current_playing_type: string;
  is_playing: boolean;
  item: {
    name: string;
    album: {
      name: string;
      images: Array<{ url: string }>;
      external_urls: { spotify: string };
      release_date?: any;
      release_date_precision?: string;
    };
    artists: Array<{
      name: string;
      external_urls: { spotify: string };
    }>;
    external_urls: { spotify: string };
  };
};

export type LikeSongsResponse = {
  items: Array<{
    track: {
      album: DefaultItem2;
      name: string;
      duration_ms: number;
      uri: string;
    };
  }>;
  total: number;
  offset: number;
};

export type RecentResponse = {
  items: Array<{
    track: {
      album: DefaultItem2;
    };
  }>;
  total: number;
  offset: number;
};
