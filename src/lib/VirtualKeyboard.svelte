<script lang="ts">
	import { keyboardLayout, keyboardModel } from "./VirtualKeyboardWrapper";
	import type { LayoutSizes } from "./types";

	let inputEl: HTMLInputElement;

	let layoutSizes: LayoutSizes = {
		enter: 1.75,
		space: 6.15,
	};

	const bind = (e: Event) => {
		if (e.target instanceof HTMLInputElement) {
			inputEl = e.target;
		}
	};
</script>

<div class="keyboardWrapper">
	<input type="text" class="input" on:click={bind} />
	<div class="keyboard">
		{#each keyboardLayout as row}
			<div class="row">
				{#each row as key}
					<button
						style={`width: ${layoutSizes[key] * 5 + layoutSizes[key] * 78}px;`}
						on:click|preventDefault|stopPropagation={() => keyboardModel(inputEl, key)}
					>
						{key === "space" ? "" : key}
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.input {
		height: 60px;
		width: 640px;
		margin-bottom: 50px;
		font-size: 36px;
	}

	.keyboard {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.row {
		display: flex;
		gap: 6px;
		justify-content: flex-start;
		&:nth-child(2) {
			margin-left: 22px;
		}

		&:nth-child(3) {
			margin-left: 44px;
		}

		&:nth-child(4) {
			margin-left: 66px;
		}
		&:nth-child(5) {
			margin-left: 35px;
			justify-content: center;
		}
	}

	button {
		width: 78px;
		height: 63px;
		box-sizing: border-box;
		padding: 0px 5px 5px 5px;
		font-size: 30px;
		line-height: 30px;
		border-radius: 0px;

		&.upperCase {
			text-transform: uppercase;
		}
	}
</style>
