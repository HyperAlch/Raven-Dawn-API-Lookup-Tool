<script lang="ts">
	// Item Name definitions
	let enableItemName: boolean = false;
	let enableItemNameStyle: boolean = false;
	let enableItemNameClass: boolean = false;
	let itemNameElementTypeRaw: string = '';
	let itemNameElementType: string = '';
	$: itemNameElementType = itemNameElementTypeRaw.trim();

	// Item Description definitions
	let enableItemDescription: boolean = false;
	let enableItemDescriptionStyle: boolean = false;
	let enableItemDescriptionClass: boolean = false;
	let itemDescriptionElementTypeRaw: string = '';
	let itemDescriptionElementType: string = '';
	$: itemDescriptionElementType = itemDescriptionElementTypeRaw.trim();

	// Item Image definitions
	let enableItemImage: boolean = false;
	let enableItemImageStyle: boolean = false;
	let enableItemImageClass: boolean = false;
	let itemImageElementTypeRaw: string = '';
	let itemImageElementType: string = '';
	let itemImageInsertMethod: string = 'span';
	let itemImageWidth: string = '';
	let itemImageHeight: string = '';
	$: itemImageElementType = itemImageElementTypeRaw.trim();
</script>

<details>
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
				bind:value={enableItemNameStyle}
			/>
			Add style attribute
		</label>
		<label for="item-name-class-checkbox">
			<input
				type="checkbox"
				id="item-name-class-checkbox"
				name="item-name-class-checkbox"
				disabled={!enableItemName}
				bind:value={enableItemNameClass}
			/>
			Add class attribute
		</label>
	</fieldset>
</details>

<details>
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
				bind:value={enableItemDescriptionStyle}
			/>
			Add style attribute
		</label>
		<label for="item-description-class-checkbox">
			<input
				type="checkbox"
				id="item-description-class-checkbox"
				name="item-description-class-checkbox"
				disabled={!enableItemDescription}
				bind:value={enableItemDescriptionClass}
			/>
			Add class attribute
		</label>
	</fieldset>
</details>

<details>
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
					bind:value={enableItemImageStyle}
				/>
				Add style attribute
			</label>
			<label for="item-image-class-checkbox">
				<input
					type="checkbox"
					id="item-image-class-checkbox"
					name="item-image-class-checkbox"
					disabled={!enableItemImage}
					bind:value={enableItemImageClass}
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
