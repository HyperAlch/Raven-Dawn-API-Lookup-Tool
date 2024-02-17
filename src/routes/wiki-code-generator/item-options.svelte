<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let apiIdValue: string;

	let itemNameUI = {
		enabled: false,
		style: false,
		class: false,
		typeRaw: '',
		type: '',
		open: false
	};
	$: itemNameElementType = itemNameUI.typeRaw.trim();

	let itemDescriptionUI = {
		enabled: false,
		style: false,
		class: false,
		typeRaw: '',
		type: '',
		open: false
	};
	$: itemDescriptionElementType = itemDescriptionUI.typeRaw.trim();

	let itemImageUI = {
		enabled: false,
		style: false,
		class: false,
		insertMethod: 'span',
		width: '',
		height: '',
		open: false
	};

	const generatedElements: Array<HTMLElement> = [];

	function processCodeGeneration() {
		if (!itemNameUI.enabled && !itemDescriptionUI.enabled && !itemImageUI.enabled) return;

		itemNameUI.open = false;
		itemDescriptionUI.open = false;
		itemImageUI.open = false;
		itemNameUI.open = true;
		itemDescriptionUI.open = true;
		itemImageUI.open = true;

		if (itemNameUI.enabled && !itemNameElementType) return;
		if (itemDescriptionUI.enabled && !itemDescriptionElementType) return;

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
		if (!itemNameUI.enabled) return true;
		if (itemNameElementType === '') return true;

		document.getElementById('item-name-element')?.removeAttribute('aria-invalid');

		try {
			let itemNameElement: HTMLElement = document.createElement(itemNameElementType);
			itemNameElement.setAttribute('data-item-api-name', apiIdValue);

			if (itemNameUI.style) itemNameElement.setAttribute('style', '…');
			if (itemNameUI.class) itemNameElement.setAttribute('class', '…');

			generatedElements.push(itemNameElement);
			return true;
		} catch (error) {
			console.error(error);
			document.getElementById('item-name-element')?.setAttribute('aria-invalid', 'true');
			return false;
		}
	}

	function processItemDescription(): boolean {
		if (!itemDescriptionUI.enabled) return true;
		if (itemDescriptionElementType === '') return true;
		document.getElementById('item-description-element')?.removeAttribute('aria-invalid');

		try {
			let itemDescriptionElement: HTMLElement = document.createElement(itemDescriptionElementType);

			itemDescriptionElement.setAttribute('data-item-api-description', apiIdValue);

			if (itemDescriptionUI.style) itemDescriptionElement.setAttribute('style', '…');
			if (itemDescriptionUI.class) itemDescriptionElement.setAttribute('class', '…');

			generatedElements.push(itemDescriptionElement);
			return true;
		} catch (error) {
			console.error(error);
			document.getElementById('item-description-element')?.setAttribute('aria-invalid', 'true');
			return false;
		}
	}

	function processItemImage() {
		if (!itemImageUI.enabled) return;

		let outputElement: HTMLElement;

		if (itemImageUI.insertMethod === 'span' || itemImageUI.insertMethod === 'div') {
			outputElement = document.createElement(itemImageUI.insertMethod);

			if (itemImageUI.insertMethod === 'div') {
				if (itemImageUI.style) outputElement.setAttribute('style', '…');
				if (itemImageUI.class) outputElement.setAttribute('class', '…');
			}
		} else {
			return;
		}

		outputElement.setAttribute('data-item-api-image', apiIdValue);
		if (itemImageUI.width !== '') outputElement.setAttribute('data-width', itemImageUI.width);
		if (itemImageUI.height !== '') outputElement.setAttribute('data-height', itemImageUI.height);

		generatedElements.push(outputElement);
	}
</script>

<form>
	<details open={itemNameUI.open}>
		<summary>Item Name</summary>

		<label for="item-name-switch">
			<input
				type="checkbox"
				id="item-name-switch"
				name="item-name-switch"
				role="switch"
				bind:checked={itemNameUI.enabled}
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
				disabled={!itemNameUI.enabled}
				bind:value={itemNameUI.typeRaw}
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
					disabled={!itemNameUI.enabled}
					bind:checked={itemNameUI.style}
				/>
				Add style attribute
			</label>
			<label for="item-name-class-checkbox">
				<input
					type="checkbox"
					id="item-name-class-checkbox"
					name="item-name-class-checkbox"
					disabled={!itemNameUI.enabled}
					bind:checked={itemNameUI.class}
				/>
				Add class attribute
			</label>
		</fieldset>
	</details>

	<details open={itemDescriptionUI.open}>
		<summary>Item Description</summary>
		<label for="item-description-switch">
			<input
				type="checkbox"
				id="item-description-switch"
				name="item-description-switch"
				role="switch"
				bind:checked={itemDescriptionUI.enabled}
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
				disabled={!itemDescriptionUI.enabled}
				bind:value={itemDescriptionUI.typeRaw}
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
					disabled={!itemDescriptionUI.enabled}
					bind:checked={itemDescriptionUI.style}
				/>
				Add style attribute
			</label>
			<label for="item-description-class-checkbox">
				<input
					type="checkbox"
					id="item-description-class-checkbox"
					name="item-description-class-checkbox"
					disabled={!itemDescriptionUI.enabled}
					bind:checked={itemDescriptionUI.class}
				/>
				Add class attribute
			</label>
		</fieldset>
	</details>

	<details open={itemImageUI.open}>
		<summary>Item Image</summary>
		<label for="item-image-switch">
			<input
				type="checkbox"
				id="item-image-switch"
				name="item-image-switch"
				role="switch"
				bind:checked={itemImageUI.enabled}
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
					disabled={!itemImageUI.enabled}
					bind:group={itemImageUI.insertMethod}
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
					disabled={!itemImageUI.enabled}
					bind:group={itemImageUI.insertMethod}
				/>
				Div (Image appendment)
			</label>
		</fieldset>
		{#if itemImageUI.insertMethod !== 'span'}
			<fieldset>
				<legend><strong>Options</strong></legend>
				<label for="item-image-style-checkbox">
					<input
						type="checkbox"
						id="item-image-style-checkbox"
						name="item-image-style-checkbox"
						disabled={!itemImageUI.enabled}
						bind:checked={itemImageUI.style}
					/>
					Add style attribute
				</label>
				<label for="item-image-class-checkbox">
					<input
						type="checkbox"
						id="item-image-class-checkbox"
						name="item-image-class-checkbox"
						disabled={!itemImageUI.enabled}
						bind:checked={itemImageUI.class}
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
					disabled={!itemImageUI.enabled}
					bind:value={itemImageUI.width}
				/>
			</label>
			<label for="item-image-height">
				Image Height
				<input
					type="text"
					id="item-image-height"
					name="item-image-height"
					placeholder="Examples: 10px, 15%"
					disabled={!itemImageUI.enabled}
					bind:value={itemImageUI.height}
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
