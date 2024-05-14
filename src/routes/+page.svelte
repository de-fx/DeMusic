<script lang="ts">
    import Main from "./main.svelte";
    import { onMount } from "svelte";
    
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:5173";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const SCOPES = "user-read-private user-read-email user-top-read";   
    function login(){
        const LOGIN_URI = new URLSearchParams({
            client_id:CLIENT_ID,
            response_type:'token',
            redirect_uri:REDIRECT_URI,
            scope:SCOPES
        });
        window.location.href = `${AUTH_ENDPOINT}?${LOGIN_URI}`;
    }

    let isLoggedIn = false;
    let urlParams: URLSearchParams | null = null; // Declare urlParams variable
    // Check if the page has been redirected from Spotify after successful login
    onMount(() => {
    urlParams = new URLSearchParams(window.location.hash.substring(1));
    if (urlParams?.has('access_token')) {
        isLoggedIn = true;
    }
});



</script>
{#if isLoggedIn}
    <!-- Content to show after successful login -->
    <Main accessToken="{urlParams?.get('access_token')}"/>
    <!-- Add more content or components here -->
{:else}
    <!-- Login button -->
    <h1>Spotify Profile</h1>
    <button type="button" on:click={login}>Log In</button>
{/if}