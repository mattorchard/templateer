<script lang='ts'>
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import { notificationsStore } from "./stores/notificationsStore";

	export let themes = {
		danger: "var(--red-500)",
		success: "var(--green-500)",
		warning: "var(--yellow-500)",
		info: "var(--blue-500)",
		default: "var(--grey-900)",
	};
</script>

<div class="notifications">
	{#each $notificationsStore as notification (notification.id)}
		<div
			animate:flip
			class="toast"
			transition:fly={{ y: 30 }}
		>
			<div class="type-indicator" style="color: {themes[notification.type]}"/>
			<div class="content">{notification.message}</div>
		</div>
	{/each}
</div>

<style>
  .notifications {
    position: fixed;
		bottom: 2rem;
    left: 1rem;
    pointer-events: none;
		display: inline-flex;
		flex-direction: column;
		gap: 1rem;
  }

  .toast {
    display: flex;
		align-items: center;
		background-color: var(--grey-400);
    padding: 1rem;
		gap: .5rem;
		width: 16rem;
  }

	.type-indicator {
		width: 1rem;
		height: 1rem;
		border-radius: 2rem;
		background-color: currentColor;
	}
</style>
