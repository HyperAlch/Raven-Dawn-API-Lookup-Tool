<script lang="ts">
	import { onMount } from 'svelte';
	import ItemOptions from './item-options.svelte';
	import { prettify } from 'htmlfy';

	let pageContentDiv: HTMLDivElement;
	let outputHTML: string = '';

	let apiType: string = '';
	let askForCodeOptions: Boolean = false;

	let apiIdValue: string = '';

	$: if (pageContentDiv) outputHTML = prettify(pageContentDiv.outerHTML);

	onMount(() => {
		pageContentDiv = document.createElement('div');
		pageContentDiv.classList.add('pageContent');

		pageContentDiv.appendChild(document.createElement('span'));
	});
</script>

<header>
	<h1>Wiki Code Generator</h1>
</header>

<main>
	{#if askForCodeOptions}
		{#if apiType === 'items'}
			<ItemOptions />
		{/if}
		<br />
		<div class="grid">
			<button class="outline">Save Code</button>
			<button class="secondary outline" on:click={() => (askForCodeOptions = false)}>Cancel</button>
		</div>
	{:else}
		<div class="grid">
			<select id="fruit" bind:value={apiType} required>
				<option value="" selected>Select an API type</option>
				<option value="items">Items</option>
			</select>
			<input type="number" id="id" name="id" placeholder="ID" bind:value={apiIdValue} required />
			<input
				type="button"
				value="Add"
				id="add-item"
				on:click={() => {
					if (apiType !== '') askForCodeOptions = true;
				}}
			/>
		</div>
		<textarea bind:value={outputHTML} readonly></textarea>
	{/if}
</main>

<style>
	h1 {
		text-align: center;
	}

	.grid {
		padding-bottom: 15px;
	}

	textarea {
		height: 400px;
	}
</style>
