<!-- App.svelte -->
<script>
    import { Router, Route } from "svelte-routing";
    import Main from "./main.svelte";
</script>

<Router>
    <Route path="/login"/>
    <Route path="/home" component={Main}/>
</Router>
