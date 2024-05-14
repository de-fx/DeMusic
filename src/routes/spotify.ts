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
        width?: number;
        height?: number;
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
        width?: number;
        height?: number;
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

export class Spotify {
    static async getUserInfo(accessToken: string): Promise<SpotifyUser> {
        try {
            console.log('Fetching user info with access token:', accessToken);
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch user information: ${errorMessage}`);
            }

            const userData = await response.json();
            console.log("User data:", userData);

            const spotifyUser: SpotifyUser = {
                id: userData.id,
                displayName: userData.display_name,
                email: userData.email,
                followers: {
                    href: userData.followers.href,
                    total: userData.followers.total
                },
                images: userData.images.map((image: any) => ({
                    url: image.url,
                    width: image.width,
                    height: image.height
                })),
                href: userData.href
            };

            return spotifyUser;
        } catch (error) {
            console.error("Error fetching user information:", error);
            throw error;
        }
    }

    static async fetchTopTracks(accessToken: string): Promise<SpotifyTrack[]> {
        const apiUrl = 'https://api.spotify.com/v1/me/top/tracks';

        try {
            console.log('Fetching top tracks with access token:', accessToken);
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch top tracks: ${errorMessage}`);
            }

            const data = await response.json();
            console.log("Top tracks data:", data);

            return this.mapSpotifyTracks(data.items);

        } catch (error) {
            console.error("Error fetching top tracks:", error);
            throw error;
        }
    }

    static mapSpotifyTracks(items: any[]): SpotifyTrack[] {
        return items.map((track: any) => ({
            id: track.id,
            name: track.name,
            artists: this.mapSpotifyArtists(track.artists),
            album: this.mapSpotifyAlbum(track.album),
            durationMs: track.duration_ms,
            explicit: track.explicit,
            popularity: track.popularity,
            previewUrl: track.preview_url,
            href: track.href,
            type: track.type,
            uri: track.uri,
            externalUrls: {
                spotify: track.external_urls.spotify
            }
        }));
    }

    static mapSpotifyArtists(artists: any[]): SpotifyArtist[] {
        return artists.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
            images: [],  // Placeholder for images, if needed
            type: artist.type,
            uri: artist.uri
        }));
    }

    static mapSpotifyAlbum(album: any): SpotifyAlbum {
        return {
            id: album.id,
            name: album.name,
            releaseDate: album.release_date,
            totalTracks: album.total_tracks,
            images: album.images.map((image: any) => ({
                url: image.url,
                width: image.width,
                height: image.height
            })),
            type: album.type,
            uri: album.uri,
            artists: this.mapSpotifyArtists(album.artists)
        };
    }

    
}
