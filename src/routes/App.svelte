<!-- App.svelte -->
<script>
    import { Router, Route } from "svelte-routing";
    import Page from "./+page.svelte";
    import Profile from "./Profile.svelte";
</script>

<Router>
    <Route path="/login" component={Page}/>
    <Route path="/profile" component={Profile}/>
</Router>
