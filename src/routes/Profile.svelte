<script lang="ts">
  import { onMount } from "svelte";
  import { Spotify } from "./spotify";
  import type { SpotifyUser, SpotifyTrack, SpotifyArtist } from "./interfaces";

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
        console.error("Error fetching user information or top tracks:", error);
      }
    } else {
      console.error("No access token provided");
    }
  });

  function logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  }
</script>

<main>
  {#if userInfo}
    <div class="profile">
      <img src={userInfo.images[1].url} alt="avatar" />
      <h1>{userInfo.displayName}</h1>
      <h3>Followers: {userInfo.followers.total}</h3>
      <button type="button" on:click={logout}>Log Out</button>
    </div>
  {/if}

  <div class="divider"></div>

  <div class="content">
    <div class="tracks">
      <h2>Top Tracks</h2>
      <ul>
        {#each topTracks.slice(0, 5) as track}
          <li class="track-info">
            {#if track.album.images[2]?.url}
              <img
                src={track.album.images[2].url}
                alt="Album cover"
                class="album-cover"
              />
            {/if}
            <div class="track-details">
              <a
                href={track.externalUrls.spotify}
                target="_blank"
                class="track-name">{track.name}</a
              >
              {#each track.artists as artist}
                <a
                  href={artist.externalUrls.spotify}
                  target="_blank"
                  class="artist-name">{artist.name}</a
                >
              {/each}
            </div>
          </li>
        {/each}
      </ul>
    </div>

    <div class="artists">
      <h2>Top Artists</h2>
      <ul>
        {#each topArtists.slice(0, 5) as artist}
          <li class="artist-info">
            {#if artist.images[2]?.url}
              <img
                src={artist.images[2].url}
                alt={artist.name}
                class="artist-image"
              />
            {/if}
            <a
              href={artist.externalUrls.spotify}
              target="_blank"
              class="artist-name top-artist-name">{artist.name}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
</main>

<style>
  /* Main styles */
  main {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* Profile styles */
  .profile {
    text-align: center;
    margin-bottom: 20px;
  }

  .profile img {
    border-radius: 50%;
    width: 125px;
    height: 125px;
  }

  .profile h1 {
    font-size: 1.5em;
    margin: 10px 0;
  }

  .profile button {
    padding: 8px 16px;
    background-color: #1db954;
    border: none;
    border-radius: 25px;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    font-family: "Gotham Light";
    font-size: medium;
  }

  /* Divider styles */
  .divider {
    width: 80%;
    height: 1px;
    background-color: grey;
    margin: 10px 0;
  }

  /* Content styles */
  .content {
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: calc(100vh - 200px);
    box-sizing: border-box;
  }

  /* Tracks and Artists styles */
  .tracks,
  .artists {
    width: 48%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .tracks h2,
  .artists h2 {
    font-size: 1.5em; /* Increase the size of the headings */
    font-weight: bold;
    margin-bottom: 10px;
  }

  /* Album cover and Artist image styles */
  .album-cover,
  .artist-image {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-right: 8px;
  }

  /* Track and Artist info styles */
  .track-info,
  .artist-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  /* Track details styles */
  .track-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align text within track-details to the start */
  }

  .track-name {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: left; /* Align the track name to the left */
    margin-bottom: 2px;
  }

  .artist-name {
    font-size: 1em;
    text-align: left; /* Align the artist name to the left */
  }

  .top-artist-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 8px;
  }

  /* Remove bullet points from lists */
  .tracks ul,
  .artists ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  /* Remove underlines from links */
  a {
    text-decoration: none;
    color: inherit;
  }
</style>
