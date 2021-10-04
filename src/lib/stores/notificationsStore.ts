import { writable, derived } from 'svelte/store';

const DEFAULT_TIMEOUT = 3_000;

const createId = () => Math.random().toString().substr(2);

const createNotificationStore = () => {
	const _notifications = writable([]);

	const createToast = (message, type = 'default', timeout) => {
		_notifications.update((state) => {
			return [...state, { id: createId(), type, message, timeout }];
		});
	};

	const notifications = derived(_notifications, ($_notifications, set) => {
		set($_notifications);
		if ($_notifications.length > 0) {
			const timer = setTimeout(() => {
				_notifications.update((state) => {
					state.shift();
					return state;
				});
			}, $_notifications[0].timeout);
			return () => {
				clearTimeout(timer);
			};
		}
	});
	const { subscribe } = notifications;

	return {
		subscribe,
		default: (msg, timeout = DEFAULT_TIMEOUT) => createToast(msg, 'default', timeout),
		danger: (msg, timeout = DEFAULT_TIMEOUT) => createToast(msg, 'danger', timeout),
		warning: (msg, timeout = DEFAULT_TIMEOUT) => createToast(msg, 'warning', timeout),
		info: (msg, timeout = DEFAULT_TIMEOUT) => createToast(msg, 'info', timeout),
		success: (msg, timeout = DEFAULT_TIMEOUT) => createToast(msg, 'success', timeout)
	};
};

export const notificationsStore = createNotificationStore();
