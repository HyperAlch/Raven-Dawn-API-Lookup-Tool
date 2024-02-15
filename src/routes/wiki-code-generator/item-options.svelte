<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let apiIdValue: string;

	// Item Name definitions
	let enableItemName: boolean = false;
	let enableItemNameStyle: boolean = false;
	let enableItemNameClass: boolean = false;
	let itemNameElementTypeRaw: string = '';
	let itemNameElementType: string = '';
	let itemNameSectionOpen: boolean = false;
	$: itemNameElementType = itemNameElementTypeRaw.trim();

	// Item Description definitions
	let enableItemDescription: boolean = false;
	let enableItemDescriptionStyle: boolean = false;
	let enableItemDescriptionClass: boolean = false;
	let itemDescriptionElementTypeRaw: string = '';
	let itemDescriptionElementType: string = '';
	let itemDescriptionSectionOpen: boolean = false;
	$: itemDescriptionElementType = itemDescriptionElementTypeRaw.trim();

	// Item Image definitions
	let enableItemImage: boolean = false;
	let enableItemImageStyle: boolean = false;
	let enableItemImageClass: boolean = false;
	let itemImageInsertMethod: string = 'span';
	let itemImageWidth: string = '';
	let itemImageHeight: string = '';
	let itemImageSectionOpen: boolean = false;

	const generatedElements: Array<HTMLElement> = [];

	function processCodeGeneration() {
		if (!enableItemName && !enableItemDescription && !enableItemImage) return;

		itemNameSectionOpen = false;
		itemDescriptionSectionOpen = false;
		itemImageSectionOpen = false;
		itemNameSectionOpen = true;
		itemDescriptionSectionOpen = true;
		itemImageSectionOpen = true;

		if (enableItemName && !itemNameElementType) return;
		if (enableItemDescription && !itemDescriptionElementType) return;

		if (!processItemName()) return;
		if (!processItemDescription()) return;
		processItemImage();

		dispatch('generateItemCodes', {
			elements: generatedElements
		});
	}

	function cancelCodeGeneration() {
		dispatch('generateItemCodes', {
			elements: []
		});
	}

	function processItemName(): boolean {
		if (!enableItemName) return true;
		if (itemNameElementType === '') return true;

		document.getElementById('item-name-element')?.removeAttribute('aria-invalid');

		try {
			let itemNameElement: HTMLElement = document.createElement(itemNameElementType);
			itemNameElement.setAttribute('data-item-api-name', apiIdValue);

			if (enableItemNameStyle) itemNameElement.setAttribute('style', '…');
			if (enableItemNameClass) itemNameElement.setAttribute('class', '…');

			generatedElements.push(itemNameElement);
			return true;
		} catch (error) {
			console.error(error);
			document.getElementById('item-name-element')?.setAttribute('aria-invalid', 'true');
			return false;
		}
	}

	function processItemDescription(): boolean {
		if (!enableItemDescription) return true;
		if (itemDescriptionElementType === '') return true;
		document.getElementById('item-description-element')?.removeAttribute('aria-invalid');

		try {
			let itemDescriptionElement: HTMLElement = document.createElement(itemDescriptionElementType);

			itemDescriptionElement.setAttribute('data-item-api-description', apiIdValue);

			if (enableItemDescriptionStyle) itemDescriptionElement.setAttribute('style', '…');
			if (enableItemDescriptionClass) itemDescriptionElement.setAttribute('class', '…');

			generatedElements.push(itemDescriptionElement);
			return true;
		} catch (error) {
			console.error(error);
			document.getElementById('item-description-element')?.setAttribute('aria-invalid', 'true');
			return false;
		}
	}

	function processItemImage() {
		if (!enableItemImage) return;

		let outputElement: HTMLElement;

		if (itemImageInsertMethod === 'span' || itemImageInsertMethod === 'div') {
			outputElement = document.createElement(itemImageInsertMethod);

			if (itemImageInsertMethod === 'div') {
				if (enableItemImageStyle) outputElement.setAttribute('style', '…');
				if (enableItemImageClass) outputElement.setAttribute('class', '…');
			}
		} else {
			return;
		}

		outputElement.setAttribute('data-item-api-image', apiIdValue);
		if (itemImageWidth !== '') outputElement.setAttribute('data-width', itemImageWidth);
		if (itemImageHeight !== '') outputElement.setAttribute('data-height', itemImageHeight);

		generatedElements.push(outputElement);
	}
</script>

<form>
	<details open={itemNameSectionOpen}>
		<summary>Item Name</summary>

		<label for="item-name-switch">
			<input
				type="checkbox"
				id="item-name-switch"
				name="item-name-switch"
				role="switch"
				bind:checked={enableItemName}
			/>
			Enable
		</label>
		<br />
		<label for="item-name-element">
			Element Type
			<input
				type="text"
				id="item-name-element"
				name="item-name-element"
				placeholder="Examples: h1, p, span"
				disabled={!enableItemName}
				bind:value={itemNameElementTypeRaw}
				required
			/>
		</label>
		<fieldset>
			<legend><strong>Options</strong></legend>
			<label for="item-name-style-checkbox">
				<input
					type="checkbox"
					id="item-name-style-checkbox"
					name="item-name-style-checkbox"
					disabled={!enableItemName}
					bind:checked={enableItemNameStyle}
				/>
				Add style attribute
			</label>
			<label for="item-name-class-checkbox">
				<input
					type="checkbox"
					id="item-name-class-checkbox"
					name="item-name-class-checkbox"
					disabled={!enableItemName}
					bind:checked={enableItemNameClass}
				/>
				Add class attribute
			</label>
		</fieldset>
	</details>

	<details open={itemDescriptionSectionOpen}>
		<summary>Item Description</summary>
		<label for="item-description-switch">
			<input
				type="checkbox"
				id="item-description-switch"
				name="item-description-switch"
				role="switch"
				bind:checked={enableItemDescription}
			/>
			Enable
		</label>
		<br />
		<label for="item-description-element">
			Element Type
			<input
				type="text"
				id="item-description-element"
				name="item-description-element"
				placeholder="Examples: h1, p, span"
				disabled={!enableItemDescription}
				bind:value={itemDescriptionElementTypeRaw}
				required
			/>
		</label>
		<fieldset>
			<legend><strong>Options</strong></legend>
			<label for="item-description-style-checkbox">
				<input
					type="checkbox"
					id="item-description-style-checkbox"
					name="item-description-style-checkbox"
					disabled={!enableItemDescription}
					bind:checked={enableItemDescriptionStyle}
				/>
				Add style attribute
			</label>
			<label for="item-description-class-checkbox">
				<input
					type="checkbox"
					id="item-description-class-checkbox"
					name="item-description-class-checkbox"
					disabled={!enableItemDescription}
					bind:checked={enableItemDescriptionClass}
				/>
				Add class attribute
			</label>
		</fieldset>
	</details>

	<details open={itemImageSectionOpen}>
		<summary>Item Image</summary>
		<label for="item-image-switch">
			<input
				type="checkbox"
				id="item-image-switch"
				name="item-image-switch"
				role="switch"
				bind:checked={enableItemImage}
			/>
			Enable
		</label>
		<br />
		<fieldset>
			<legend><strong>Insert Method</strong></legend>
			<label for="item-image-method-span-radio">
				<input
					type="radio"
					id="item-image-method-span-radio"
					name="item-image-method-radio"
					value="span"
					disabled={!enableItemImage}
					bind:group={itemImageInsertMethod}
					checked
				/>
				Span (In-place image replacement)
			</label>
			<label for="item-image-method-div-radio">
				<input
					type="radio"
					id="item-image-method-div-radio"
					name="item-image-method-radio"
					value="div"
					disabled={!enableItemImage}
					bind:group={itemImageInsertMethod}
				/>
				Div (Image appendment)
			</label>
		</fieldset>
		{#if itemImageInsertMethod !== 'span'}
			<fieldset>
				<legend><strong>Options</strong></legend>
				<label for="item-image-style-checkbox">
					<input
						type="checkbox"
						id="item-image-style-checkbox"
						name="item-image-style-checkbox"
						disabled={!enableItemImage}
						bind:checked={enableItemImageStyle}
					/>
					Add style attribute
				</label>
				<label for="item-image-class-checkbox">
					<input
						type="checkbox"
						id="item-image-class-checkbox"
						name="item-image-class-checkbox"
						disabled={!enableItemImage}
						bind:checked={enableItemImageClass}
					/>
					Add class attribute
				</label>
			</fieldset>
		{/if}
		<div class="grid">
			<label for="item-image-width">
				Image Width
				<input
					type="text"
					id="item-image-width"
					name="item-image-width"
					placeholder="Examples: 10px, 15%"
					disabled={!enableItemImage}
					bind:value={itemImageWidth}
				/>
			</label>
			<label for="item-image-height">
				Image Height
				<input
					type="text"
					id="item-image-height"
					name="item-image-height"
					placeholder="Examples: 10px, 15%"
					disabled={!enableItemImage}
					bind:value={itemImageHeight}
				/>
			</label>
		</div>
	</details>

	<br />
	<div class="grid">
		<input type="submit" class="outline" on:click={processCodeGeneration} value="Save Code" />
		<button class="secondary outline" on:click={cancelCodeGeneration}>Cancel</button>
	</div>
</form>
