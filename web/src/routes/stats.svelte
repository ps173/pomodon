<script>
	import { user } from '../../src/stores/userStore';
</script>

<div class="stats">
	{#if $user.isLoggedIn}
		showing stats for {$user.userInfo.displayName}
	{:else}
		You are not logged in
	{/if}
</div>

<style>
	.stats {
		display: grid;
		place-items: center;
		color: cadetblue;
		font-size: 1.5em;
		height: 80%;
		width: 100%;
	}
</style>
