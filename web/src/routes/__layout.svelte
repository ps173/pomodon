<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import { user } from '../../src/stores/userStore';
	import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';

	const firebaseConfig = {
		apiKey: import.meta.env.VITE_API_KEY,
		authDomain: import.meta.env.VITE_AUTH_DOMAIN,
		projectId: import.meta.env.VITE_PROJECT_ID,
		storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
		messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
		appId: import.meta.env.VITE_APP_ID,
		measurementId: import.meta.env.VITE_MEASUREMENT_ID
	};
	const app = initializeApp(firebaseConfig);
	const provider = new GoogleAuthProvider();

	function SignIn() {
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				user.set({
					isLoggedIn: true,
					userInfo: result.user
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
			});
	}
</script>

<div class="nav">
	<a href="/">
		<h1>Pomodon</h1>
	</a>
	<div class="links">
		{#if $user.isLoggedIn}
			<div>{$user.userInfo.displayName}</div>
		{:else}
			<button on:click={SignIn}> Sign in with google</button>
		{/if}
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
