import { writable } from 'svelte/store';
import { browser } from '$app/env';
import type { User } from 'firebase/auth';
interface userStore {
	userInfo?: User;
	isLoggedIn: boolean;
}

const storedUser: userStore =
	browser && JSON.parse(localStorage.getItem('user'))
		? JSON.parse(localStorage.getItem('user'))
		: { isLoggedIn: false };

export const user = writable(storedUser);

user.subscribe((value) => {
	browser && localStorage.setItem('user', JSON.stringify(value));
});
