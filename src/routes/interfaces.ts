export interface SpotifyUser {
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

export interface SpotifyArtist {
    id: string;
    name: string;
    images: {
        url: string;
        width: number | null;
        height: number | null;
    }[];
    type: string;
    uri: string;
}


export interface SpotifyAlbum {
    id: string;
    name: string;
    releaseDate: string;
    totalTracks: number;
    images: {
        url: string;
        width: number | null;
        height: number | null;
    }[];
    type: string;
    uri: string;
    artists: SpotifyArtist[];
}


export interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    durationMs: number;
    explicit: boolean;
    popularity: number;
    previewUrl: string | null;
    href: string;
    type: string;
    uri: string;
    externalUrls: {
        spotify: string;
    };
}
