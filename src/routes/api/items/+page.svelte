<script lang="ts">
	let searchByName: boolean = true;
</script>

<header>
	<h1>Item API</h1>
	<fieldset>
		<legend><strong>Change Search Method</strong></legend>
		<label for="switch-1">
			<input
				type="checkbox"
				id="switch-1"
				name="switch-1"
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
	<input type="search" id="search" name="search" placeholder="Search" />
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
					<tr>
						<th scope="row">29974</th>
						<td>Infusion</td>
						<td>Used for infusions.</td>
						<td
							><img
								src="https://cdn-api.ravendawn.online/assets/infusion-hejObATe.png"
								alt="Infusion"
							/></td
						>
					</tr>
					<tr>
						<th scope="row">37290</th>
						<td>Warband Infusion</td>
						<td>Used for infusions.</td>
						<td
							><img
								src="https://cdn-api.ravendawn.online/assets/warband_infusion-YV6Hkyeq.png"
								alt="Warband Infusion"
							/></td
						>
					</tr>
					<tr>
						<th scope="row">37291</th>
						<td>Ancient Infusion</td>
						<td>Used for infusions.</td>
						<td
							><img
								src="https://cdn-api.ravendawn.online/assets/ancient_infusion-9V6ocsd1.png"
								alt="Ancient Infusion"
							/></td
						>
					</tr>
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
