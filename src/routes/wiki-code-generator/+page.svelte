<script lang="ts">
	import { onMount } from 'svelte';
	import ItemOptions from './item-options.svelte';

	let pageContentDiv: HTMLDivElement;
	let outputHTML: String = '';

	let apiType: String = '';
	let askForCodeOptions: Boolean = false;

	$: if (pageContentDiv) outputHTML = pageContentDiv.outerHTML.replaceAll('>', '>\n');

	onMount(() => {
		pageContentDiv = document.createElement('div');
		pageContentDiv.classList.add('pageContent');
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
			<input type="number" id="id" name="id" placeholder="ID" required />
			<input type="button" value="Add" id="add-item" on:click={() => (askForCodeOptions = true)} />
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
