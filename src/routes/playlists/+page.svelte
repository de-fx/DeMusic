<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { Spotify } from '../../lib/spotify';
  import type { Playlist } from '../../lib/interfaces';

  let accessToken: string | null = '';
  $: {
    const searchParams = new URLSearchParams($page.url.search);
    accessToken = searchParams.get('accessToken');
    console.log("Access Token:", accessToken);  // Logging the access token
  }

  let playlists: Playlist[] = [];

  onMount(async () => {
    if (accessToken) {
      const validAccessToken = accessToken as string;
      try {
        playlists = await Spotify.fetchPlaylists(validAccessToken);
        console.log("Playlists:", playlists);  // Logging the fetched playlists
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    } else {
      console.error("No access token provided");
    }
  });
</script>

<main>
  <div class="playlists">
    {#if playlists.length > 0}
      {#each playlists as playlist}
          <a href={playlist.externalUrls?.spotify} class="playlist" target="_blank">
            {#if playlist.images && playlist.images.length > 0}
              <img src={playlist.images[0]?.url} alt={playlist.name} class="playlist-cover"/>
            {/if}
            <span>{playlist.name}</span>
          </a>
      {/each}
    {:else}
      <p>No playlists available</p>  <!-- Add this line for debugging -->
    {/if}
  </div>
</main>


<style>
  .playlists {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    color: white;
  }

  .playlist {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .playlist-cover {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-right: 10px;
  }
</style>