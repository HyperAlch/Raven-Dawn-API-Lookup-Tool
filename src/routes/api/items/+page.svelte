<script lang="ts">
	import { onMount } from 'svelte';
	import type { Item } from '../../../lib/index';
	import { item_api } from '../../../lib/api_urls';

	let data: Array<Item> = [];
	let tableData: Array<Item> = [];

	let searchByName: boolean = true;
	let searchValue: string = '';

	const delay: number = 2;
	let delayCount: number = delay;
	let loadImages: boolean = false;

	$: startLoadingImages(loadImages);
	$: doSearch(parseSearch(searchValue));
	$: resetSearch(searchByName);
	$: startDelayCount(tableData);

	function startLoadingImages(shouldLoad: boolean) {
		if (shouldLoad) {
			let images = document.querySelectorAll('[data-src]');
			if (images.length === 0) return;

			for (const el of images) {
				let img = document.createElement('img');

				let src = el.getAttribute('data-src');
				let alt = el.getAttribute('data-alt');

				if (src) img.setAttribute('src', src);
				if (alt) img.setAttribute('alt', alt);

				el.replaceWith(img);
			}
		}
	}

	function startDelayCount(dummyValue: Array<Item>) {
		loadImages = false;
		delayCount = 0;
	}

	function resetSearch(dummyValue: boolean) {
		doSearch(parseSearch(searchValue));
	}

	async function fetch_api() {
		const item_api_url: string = item_api;
		let data: Array<Item> = await (await fetch(item_api_url)).json();

		return data;
	}

	function parseSearch(value: string): number | string {
		if (searchByName) return value;

		let parsedId = parseInt(value);
		if (!isNaN(parsedId)) return parsedId;

		return '';
	}

	function doSearch(value: number | string) {
		if (typeof value === 'string') {
			let strValue = value.trim().toLocaleLowerCase();
			if (strValue.length === 0) {
				tableData = [];
				return;
			}

			if (data.length !== 0) {
				tableData = data.filter((x) => x.name.toLocaleLowerCase().includes(strValue));
			}
		} else if (typeof value === 'number') {
			let strValue = value.toString();
			tableData = data.filter((x) => x.id.toString().includes(strValue));
		} else {
			console.error(`Search value "${value}" is not valid`);
		}
	}

	onMount(() => {
		fetch_api()
			.then((json) => (data = json))
			.catch((error) => console.error(error));

		const interval = setInterval(() => {
			if (delayCount < delay) {
				delayCount += 1;
			} else {
				loadImages = true;
			}
		}, 1000);
	});
</script>

<header>
	<h1>Item API</h1>
	<fieldset>
		<legend><strong>Change Search Method</strong></legend>
		<label for="search-method-switch">
			<input
				type="checkbox"
				id="search-method-switch"
				name="search-method-switch"
				role="switch"
				bind:checked={searchByName}
			/>
			{#if searchByName}
				<code>Item Name</code>
			{:else}
				<code>Item ID</code>
			{/if}
		</label>
	</fieldset>
	<input
		type="search"
		id="search"
		name="search"
		placeholder="Search"
		bind:value={searchValue}
		disabled={data.length === 0}
	/>
</header>

<main>
	<section id="tables">
		<figure>
			<table role="grid">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Description</th>
						<th scope="col">Image</th>
					</tr>
				</thead>
				<tbody>
					{#each tableData as row}
						<tr>
							<th scope="row">{row.id}</th>
							<td>{row.name}</td>
							<td>{row.description}</td>
							<td><span aria-busy="true" data-src={row.image} data-alt={row.name}>Loading</span></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</figure>
	</section>
</main>

<style>
	h1,
	fieldset {
		text-align: center;
	}

	legend {
		padding-bottom: 4px;
	}
</style>
