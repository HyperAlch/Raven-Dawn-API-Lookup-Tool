<script lang="ts">
	import { onMount } from 'svelte';
	import ItemOptions from './item-options.svelte';
	import { prettify } from 'htmlfy';

	let pageContentDiv: HTMLDivElement;
	let outputHTML: string = '';

	let apiType: string = '';
	let askForCodeOptions: Boolean = false;

	let apiIdValue: string = '';
	let itemFetchIdsSet: Set<string> = new Set();

	onMount(() => {
		pageContentDiv = document.createElement('div');
		pageContentDiv.classList.add('pageContent');

		outputHTML = prettify(pageContentDiv.outerHTML);
	});

	function handleGenerateItemCodes(event: any) {
		askForCodeOptions = false;
		const elements: Array<HTMLElement> = event.detail.elements;

		for (const el of elements) {
			pageContentDiv.appendChild(el);
		}

		if (elements.length > 0) {
			pageContentDiv.appendChild(document.createElement('br'));
			itemFetchIdsSet.add(apiIdValue);

			pageContentDiv.removeAttribute('data-item-api-fetch');

			let idStr = '';
			for (const id of itemFetchIdsSet) {
				idStr += ` ${id}`;
			}

			pageContentDiv.setAttribute('data-item-api-fetch', idStr.slice(1));
		}

		outputHTML = prettify(pageContentDiv.outerHTML).replaceAll('<br />', '\n');
		apiIdValue = '';
	}
</script>

<header>
	<a href="/">Home</a>

	<h1>Wiki Code Generator</h1>
</header>

<main>
	{#if askForCodeOptions}
		{#if apiType === 'items'}
			<ItemOptions on:generateItemCodes={handleGenerateItemCodes} {apiIdValue} />
		{/if}
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
					if (apiType !== '' && apiIdValue) askForCodeOptions = true;
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
