import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
interface userStore {
	userInfo?: User;
	isLoggedIn: boolean;
}
export const user = writable({
	isLoggedIn: false
} as userStore);
