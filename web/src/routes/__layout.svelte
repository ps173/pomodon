<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import { user } from '../../src/stores/userStore';
	import {
		getAuth,
		signInWithPopup,
		GoogleAuthProvider,
		signOut,
		onAuthStateChanged
	} from 'firebase/auth';

	const firebaseConfig = {
		apiKey: import.meta.env.VITE_API_KEY,
		authDomain: import.meta.env.VITE_AUTH_DOMAIN,
		projectId: import.meta.env.VITE_PROJECT_ID,
		storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
		messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
		appId: import.meta.env.VITE_APP_ID,
		measurementId: import.meta.env.VITE_MEASUREMENT_ID
	};
	initializeApp(firebaseConfig);
	const auth = getAuth();

	function SignIn() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				user.set({
					isLoggedIn: true,
					userInfo: result.user
				});
			})
			.catch((error) => {
				console.error(error.code, error.message);
			});
	}

	const SignOut = () => {
		signOut(auth).then(() => {
			user.set({
				isLoggedIn: false
			});
		});
		localStorage.removeItem('user');
	};
</script>

<!-- TODO: ADD MOBILE ASSET -->
<div class="background">
	<img src="./background-waves-desktop-haikei.svg" alt="" />
</div>
<div class="nav">
	<a href="/">
		<h1>Pomodon</h1>
	</a>
	<div class="links">
		{#if $user.isLoggedIn}
			<div class="user-card">
				<img src={$user.userInfo.photoURL} on:click={SignOut} alt={$user.userInfo.displayName} />
			</div>
		{:else}
			<button class="signin-button" on:click={SignIn}> Sign in with google</button>
		{/if}
		<!-- <a href="/stats">Stats</a>
		<a href="https://github.com/ps173/pomodon">github</a> -->
	</div>
</div>
<slot />

<style>
	.background {
		position: fixed;
		z-index: -10;
	}
	.background img {
		object-fit: cover;
		height: 100vh;
		width: 100vw;
	}
	/* TODO: CHANGE TO MODAL */
	.links {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 2%;
	}
	.signin-button {
		min-width: 180px;
		min-height: 45px;
		height: 12%;
		border-radius: 50px;
		font-size: small;
		color: #ededed;
		background-color: #2d2d2d;
		outline: none;
		border: 2px solid #da0037;
		transition: 0.3s;
	}

	.signin-button:hover {
		color: #da0037;
		background-color: #212121;
		transition: 0.3s;
	}
	.user-card img {
		border-radius: 50%;
		margin-top: 1vh;
		border: 2px solid #da0037;
		width: 50px;
		height: 50px;
	}
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
		color: #ededed;
		margin-left: 1em;
	}

	.nav a {
		padding-left: 1em;
		padding-right: 1em;
		color: tomato;
		transition: all 0.3s;
	}
</style>
