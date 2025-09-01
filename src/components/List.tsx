import { For, Show, type Accessor, type Setter } from "solid-js";

type ListProps = {
  items: [Accessor<string[]>, Setter<string[]>]; // tuple from createSignal
};

export function List(props: ListProps) {
	const [items, setItems] = props.items;

	let inputRef!: HTMLInputElement;

	const addItem = () => {
		const value = inputRef.value.trim();
		if (!value) return;
		setItems([...items(), value]);
		inputRef.value = "";
	};

	const removeItem = (index: number) => {
		setItems(items().filter((_, i) => i !== index));
	};

	return (
		<div class="flex flex-col gap-4">

			<div class="w-full join">
				<input
					ref={inputRef}
					type="text"
					placeholder="Enter item"
					class="input join-item"
					onKeyDown={(e) => e.key === "Enter" && addItem()}
				/>
				<button
					type="button"
					class="btn join-item"
					onClick={() => addItem()}
				>
					Add
				</button>
			</div>

			<ul class="list bg-base-100 rounded-lg shadow-md">
				<li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
					<Show when={items().length === 0}>
						Empty
					</Show>
					<Show when={items().length > 0}>
						Current list
					</Show>
				</li>

				<For each={items()}>
					{(item, i) => (
						<li class="list-row items-center">
							<div class="list-col-grow">
								{item}
							</div>
							<button
								type="button"
								class="btn btn-square btn-ghost"
								onClick={() => removeItem(i())}
							>
								✕
							</button>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}
