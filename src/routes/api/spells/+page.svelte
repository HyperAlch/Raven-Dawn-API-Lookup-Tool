<script lang="ts">
	import { onMount } from 'svelte';
	import type { Spell, Archetype } from '../../../lib/index';
	import { spell_api, archetype_api } from '../../../lib/api_urls';
	import { modalSetup, toggleModal } from '../../../lib/pico_modal';

	let data: Array<Spell> = [];
	let archetype_data: Array<Archetype> = [];

	let tableData: Array<Spell> = [];

	let searchByName: boolean = true;
	let searchValue: string = '';

	const delay: number = 2;
	let delayCount: number = delay;
	let loadImages: boolean = false;

	let descriptionModal = {
		id: '',
		name: '',
		en: '',
		ptBR: ''
	};

	$: updateDescriptionModal(descriptionModal.id);

	function updateDescriptionModal(id: string) {
		if (!id) return;
		let spell: Spell = data.filter((x) => x.id.toString() === id)[0];

		descriptionModal.name = spell.name;
		descriptionModal.en = spell.description.format;
		descriptionModal.ptBR = spell.description.translation['pt-BR'];
	}

	function getArchetypeName(id: number): string {
		let archetype = archetype_data.filter((x) => x.id === id)[0];
		if (archetype) return archetype_data.filter((x) => x.id === id)[0].name;
		else return 'None';
	}

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

	function startDelayCount(dummyValue: Array<Spell>) {
		loadImages = false;
		delayCount = 0;
	}

	function resetSearch(dummyValue: boolean) {
		doSearch(parseSearch(searchValue));
	}

	async function fetch_api() {
		const spell_api_url: string = spell_api;
		let data: Array<Spell> = await (await fetch(spell_api_url)).json();
		let archetype_data = await (await fetch(archetype_api)).json();

		const json = {
			data,
			archetype_data: archetype_data.archetypes
		};

		return json;
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
		modalSetup();

		fetch_api()
			.then((json) => {
				data = json.data;
				archetype_data = json.archetype_data;
			})
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

{#if data.length !== 0}
	<header>
		<a href="/">Home</a>
		<h1>Spell API</h1>
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
					<code>Spell Name</code>
				{:else}
					<code>Spell ID</code>
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
{/if}

<main>
	{#if data.length === 0}
		<h1>Loading...</h1>
		<article aria-busy="true"></article>
	{:else}
		<section id="tables">
			<figure>
				<table role="grid">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">Channeling</th>
							<th scope="col">Cooldown</th>
							<th scope="col">Archetype</th>
							<th scope="col">Range</th>
							<th scope="col">Cost</th>
							<th scope="col">Description</th>
							<th scope="col">Image</th>
						</tr>
					</thead>
					<tbody>
						{#each tableData as row}
							<tr>
								<th scope="row">{row.id}</th>
								<td>{row.name}</td>
								<td>
									{#if row.channeling}
										Channel
									{:else}
										Instant
									{/if}
								</td>
								<td>{row.cooldown}</td>
								<td>{getArchetypeName(row.archetype)}</td>
								<td>{row.range}</td>
								<td>Mana: {row.cost.mana}</td>
								<td
									><a
										href="#"
										data-target="modal-description"
										data-model-id={row.id}
										on:click|preventDefault={(event) => {
											event.preventDefault();
											let id = event.currentTarget.getAttribute('data-model-id');
											if (id) {
												descriptionModal.id = id;
											}
											toggleModal(event);
										}}>View</a
									></td
								>

								<td
									><span aria-busy="true" data-src={row.image} data-alt={row.name}>Loading</span
									></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</figure>
		</section>
	{/if}
</main>

<!-- Modal -->

<dialog id="modal-description">
	<article>
		<a
			href="#close"
			aria-label="Close"
			class="close"
			data-target="modal-description"
			on:click={toggleModal}
		>
		</a>
		<h3>Descriptions for "{descriptionModal.name}"</h3>
		<p>
			<b>English</b>
			<br /><br />
			<code>{descriptionModal.en}</code>
		</p>
		<p>
			<b>Portuguese (Brazil) </b>
			<br /><br />
			<code>{descriptionModal.ptBR}</code>
		</p>
	</article>
</dialog>

<style>
	h1,
	fieldset {
		text-align: center;
	}

	legend {
		padding-bottom: 4px;
	}

	td,
	th {
		text-align: center;
	}
</style>
