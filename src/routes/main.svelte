<script lang="ts">
    import { onMount } from 'svelte';
    import { Spotify } from './spotify';
    import type { SpotifyUser, SpotifyTrack } from "./spotify";

    export let accessToken: string | null | undefined;

    let userInfo: SpotifyUser | null = null;
    let topTracks: SpotifyTrack[] = [];

    onMount(async () => {
        if (accessToken) {
            const validAccessToken = accessToken as string;
            try {
                userInfo = await Spotify.getUserInfo(validAccessToken);
                topTracks = await Spotify.fetchTopTracks(validAccessToken);
            } catch (error) {
                console.error('Error fetching user information or top tracks:', error);
            }
        } else {
            console.error('No access token provided');
        }
    });
</script>

<main>
    {#if userInfo}
        <h1>{userInfo.displayName}</h1>
        <p>Email: {userInfo.email}</p>
        <p>Followers: {userInfo.followers.total}</p>
    {/if}

    <div class="tracks">
        {#if topTracks.length > 0}
            <h2>Top 5 Tracks</h2>
            <ul>
                {#each topTracks.slice(0, 5) as track, index}
                    <li>{index + 1}. {track.name} by {#each track.artists as artist}{artist.name}{/each} (Played: {track.popularity})
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</main>

<style>
    .tracks {
        margin-top: 20px;
    }
    .tracks h2 {
        font-size: 1.5em;
    }
    .tracks ul {
        list-style-type: none;
        padding: 0;
    }
    .tracks li {
        margin: 10px 0;
        font-size: 1.2em;
    }
</style>

