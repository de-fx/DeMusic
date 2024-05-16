<script lang="ts">
    import { onMount } from 'svelte';
    import { Spotify } from './spotify';
    import type { SpotifyUser, SpotifyTrack, SpotifyArtist } from "./interfaces";
  import { useLocation } from 'svelte-routing';

    export let accessToken: string | null | undefined;

    let userInfo: SpotifyUser | null = null;
    let topTracks: SpotifyTrack[] = [];
    let topArtists: SpotifyArtist[] = [];

    
    onMount(async () => {
        if (accessToken) {
            const validAccessToken = accessToken as string;
            try {
                userInfo = await Spotify.getUserInfo(validAccessToken);
                topTracks = await Spotify.fetchTopTracks(validAccessToken);
                topArtists = await Spotify.fetchTopArtists(validAccessToken);
            } catch (error) {
                console.error('Error fetching user information or top tracks:', error);
            }
        } else {
            console.error('No access token provided');
        }
        
    });
    function logout(){
            localStorage.removeItem('access_token');
                window.location.href = "/";
        }
</script>

<main>
    {#if userInfo}
        <div class="profile">
        <img src="{userInfo.images[1].url}" alt="Avatar">
        <h1>{userInfo.displayName}</h1>
        <p>Email: {userInfo.email}</p>
        <p>Followers: {userInfo.followers.total}</p>
        <button type="button" on:click={logout}>Log Out</button>
        </div>
        
    {/if}

    <div class="tracks">
        {#if topTracks.length > 0}
            <h2>Top Tracks</h2>
            <ul>
                {#each topTracks.slice(0, 5) as track}
                    <li>{track.name} <br>
                        {#each track.artists as artist}
                            {artist.name}
                        {/each}
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    
    <div class="artists">
        {#if topArtists && topArtists.length > 0}
            <h2>Top Artists</h2>
            <ul>
                {#each topArtists.slice(0, 5) as artist}
    <li>
        <a href="{artist.uri}" target="_self">{artist.name}</a> <br>
    </li>
{/each}
            </ul>
        {/if}
    </div>
</main>