<div class="nav">
	<a href="/">
		<h1>Pomodon</h1>
	</a>
	<div class="links">
		<a href="/stats">Stats</a>
		<a href="https://github.com/ps173/pomodon">github</a>
	</div>
</div>
<slot />

<style>
	a {
		text-decoration: none;
	}
	.nav {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav h1 {
		color: #ee7123;
		background-color: rgba(24, 24, 24, 0.5);
		border: 1px groove black;
		padding-top: 0.1em;
		padding-bottom: 0.1em;
		padding-left: 0.5em;
		padding-right: 0.5em;
		margin-left: 1em;
	}

	.nav a {
		padding-left: 1em;
		padding-right: 1em;
		color: tomato;
		transition: all 0.3s;
	}
</style>
