type Image = { url: string };
type ExternalUrls = { spotify: string };
type Artist = {
  name: string;
  id?: string;
  uri?: string;
  external_urls?: ExternalUrls;
};
type Track = {
  id: string;
  name: string;
  duration_ms: number;
  uri: string;
};
type AlbumBase = {
  id: string;
  name: string;
  images: Image[];
  external_urls: ExternalUrls;
  artists: Artist[];
  type: string;
};
export type Album = AlbumBase & {
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  label?: string;
  uri: string;
};

export type DefaultItem = AlbumBase & {
  description: string;
  uri: string;
};

export type SearchResult = {
  tracks: { items: TopTrack[] };
  artists: { items: TopArtist[] };
  albums: { items: Album[] };
};

export type PlaylistResponse = {
  items: DefaultItem[];
  total: number;
};

export type AlbumResponse = {
  items: Array<{ album: Album }>;
  total: number;
  offset: number;
};

export type AlbumById = Album & {
  tracks: { items: Track[] };
};

export type PlaylistById = {
  id: string;
  name: string;
  type: string;
  images: Image[];
  external_urls: ExternalUrls;
  tracks: {
    items: Array<{
      track: Track & { album: Album };
    }>;
  };
};

export type TopArtist = Artist & {
  images: Image[];
  followers: { href: string; total: number };
  type: string;
};

export type TopTrack = Track & {
  album: {
    id: string;
    name: string;
    images: Image[];
  };
  artists: Artist[];
  external_urls: ExternalUrls;
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
    artists: Artist[];
    external_urls: ExternalUrls;
  };
};

export type LikeSongsResponse = {
  items: Array<{
    track: Track & { album: Album };
  }>;
  total: number;
  offset: number;
};

export type RecentResponse = {
  items: Array<{
    track: { album: Album };
  }>;
  total: number;
  offset: number;
};
