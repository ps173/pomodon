<script>
 import Timer from "./routes/Timer.svelte"
 import Stats from "./routes/Stats.svelte"
 import {Link, Router , Route} from "svelte-routing"
</script>

<svelte:head>
	<title>Pomodon : A Pomodoro timer</title>
   <meta name="description" content="Pomodon is a pomodoro timer to maintain your productivity" />
	<html lang="en" />
</svelte:head>

<Router>
<div class="nav"> 
 <Link to="/">
   <h1> Pomodon </h1>
 </Link>
 <div class="links">
  <Link to="/stats"><a href=none>Stats</a></Link>
  <a href="https://github.com/ps173">github</a>
 </div>
</div>

 <Route path="/">
  <Timer/>
 </Route>

 <Route path="/stats">
  <Stats/>
 </Route>

</Router>

<style>

 .nav{
  width : 100%;
  display: flex;
  align-items: center;
  justify-content : space-between;
 }

 .nav h1 {
  color : #EE7123;
  background-color: rgba(24, 24, 24,0.5);
  border: 1px groove black;
  padding-top : 0.1em;
  padding-bottom : 0.1em;
  padding-left : 0.5em;
  padding-right : 0.5em;
  margin-left:1em;
 }

 .nav a{
  padding-left : 1em;
  padding-right : 1em;
  color: tomato;
  transition: all 0.3s;
 }

</style>
