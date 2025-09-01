import type { JSXElement, ParentProps } from 'solid-js';

type Props = ParentProps<{
    id: string,
    drawerContent: JSXElement,
}>

export function Drawer({
    id,
    drawerContent,
    children,
}: Props) {
    return (
        <div class="drawer drawer-end">
            <input id={id} type="checkbox" class="drawer-toggle" />

            <div class="drawer-content">
                <label for={id} class="drawer-button btn btn-ghost">
                    { drawerContent }
                </label>
            </div>

            <div class="drawer-side">
                <label for={id} aria-label="close sidebar" class="drawer-overlay"></label>

                <div class="bg-base-200 text-base-content h-screen min-h-screen w-80 p-4 [&>*]:min-h-full [&>*]:min-w-full">
                    { children }
                </div>
            </div>
        </div>
    )
}