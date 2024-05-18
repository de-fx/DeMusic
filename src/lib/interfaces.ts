
export interface User {
    id: string;
    displayName: string;
    email: string;
    followers: {
        href: string;
        total: number;
    };
    images: {
        url: string;
        width?: number;
        height?: number;
    }[];
    href: string;
}

export interface Artist {
    id: string;
    name: string;
    images: { url: string; width: number; height: number }[];
    type: string;
    uri: string;
    externalUrls: {
        spotify?: string;
    };
}

export interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: Album;
    durationMs: number;
    explicit: boolean;
    popularity: number;
    previewUrl: string | null;
    href: string;
    type: string;
    uri: string;
    externalUrls: {
        spotify?: string;
    }
}

export interface Album {
    id: string;
    name: string;
    releaseDate: string;
    totalTracks: number;
    images: { url: string; width: number; height: number }[];
    type: string;
    uri: string;
    artists: Artist[];
}

export interface Playlist {
    id: string;
    name: string;
    images: {
        url: string;
        height?:number;
        width?:number
    };
    description: string;
    tracks: {
      items: { track: Track }[];
    };
  }