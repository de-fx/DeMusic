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
      <p>Followers: {userInfo.followers.total}</p>
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
              <img src={track.album.images[2].url} alt="Album cover" class="album-cover" />
            {/if}
            <div>
              <a href={track.externalUrls.spotify} target="_blank" class="track-name">{track.name}</a><br />
              {#each track.artists as artist}
                <a href={artist.externalUrls.spotify} target="_blank" class="artist-name">{artist.name}</a>
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
              <img src={artist.images[2].url} alt="{artist.name}" class="artist-image" />
            {/if}
            <a href={artist.externalUrls.spotify} target="_blank" class="artist-name">{artist.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</main>
 
<style>
/* Main styles */
main {
  padding: 10px 20px; /* Reduce padding */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set main height to fill the viewport */
}

/* Profile styles */
.profile {
  text-align: center;
  margin-bottom: 20px; /* Reduce margin */
}

.profile img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.profile h1 {
  font-size: 1.8em; /* Reduce font size */
  margin: 10px 0;
}

.profile p {
  font-size: 1.1em; /* Reduce font size */
}

.profile button {
  padding: 8px 16px; /* Reduce padding */
  background-color: #1db954;
  border: none;
  border-radius: 25px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  font-family: "JetBrains Mono";
  font-size: medium; /* Reduce font size */
}

/* Divider styles */
.divider {
  width: 80%;
  height: 1px;
  background-color: grey;
  margin: 10px 0; /* Reduce margin */
}

/* Content styles */
.content {
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: calc(100vh - 300px); /* Adjust height to fit within viewport */
  margin-bottom: 10px; /* Reduce margin */
  overflow-y: hidden; /* Disable vertical scrolling */
}

/* Tracks and Artists styles */
.tracks,
.artists {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tracks h2,
.artists h2 {
  font-size: 1.3em; /* Reduce font size */
  font-weight: bold;
  margin-bottom: 10px; /* Reduce margin */
}

/* Album cover and Artist image styles */
.album-cover,
.artist-image {
  width: 60px; /* Adjust width */
  height: 60px; /* Adjust height */
  border-radius: 8px;
  margin-bottom: 5px; /* Reduce margin */
}

/* Track and Artist info styles */
.track-info,
.artist-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* Add space between items */
}

.track-name {
  font-size: 1.2rem; /* Adjust font size */
  font-weight: bold;
  margin-left: 10px; /* Add margin to separate image from text */
}

.artist-name {
  font-size: 1em; /* Adjust font size */
  margin-left: 10px; /* Add margin to separate image from text */
  color: grey; /* Different color to differentiate */
}

.track-info a,
.artist-info a {
  text-decoration: none; /* Remove underline */
}

/* Remove bullet points from lists */
.tracks ul,
.artists ul {
  list-style-type: none;
  padding: 0;
  margin: 0; /* Remove default margin */
}

/* Remove underlines from links */
a {
  text-decoration: none;
  color: inherit;
}
</style>
