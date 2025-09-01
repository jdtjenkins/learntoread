import { createMemo, createSignal, For, Show } from 'solid-js'
import PencilSvg from "../icons/pencil.svg?raw"
import ResetSvg from "../icons/reset.svg?raw"
import CheckSvg from "../icons/check.svg?raw"
import CrossSvg from "../icons/cross.svg?raw"
import { Drawer } from './Drawer'
import { List } from "./List"

export function App() {
    const wordSignal = createSignal<string[]>([])
    const [words, setWords] = wordSignal
    const [currentWordIndex, setCurrentWordIndex] = createSignal(0)
    const [ wordsStatus, setWordsStatus ] = createSignal<boolean[]>([])

    const setIndexStatus = (correct: boolean = true) => {
        const statuses = [...wordsStatus()]
        const index = currentWordIndex()

        statuses[index] = correct

        setWordsStatus(statuses)

        setCurrentWordIndex(index + 1)
    }

    const reset = () => {
        setCurrentWordIndex(0)
        setWordsStatus([])
    }

    const correctAnswers = createMemo(() => wordsStatus().filter(status => !!status).length)

    return (
        <>
            <div class="w-screen h-screen flex items-center justify-center overflow-auto">
                <Show when={words().length === 0}>
                    <div>
                        <h2 class="text-center text-2xl font-bold">
                            No words set.
                        </h2>
                        <h3 class="text-center mt-4">Add some below!</h3>
                    </div>

                    <span class="fixed bottom-[70px] left-1/2 -translate-x-1/2 text-4xl animate-bounce">👇</span>
                </Show>

                <Show when={words().length > 0}>
                    <Show when={wordsStatus().length < words().length}>
                        <h1 class="text-center text-4xl font-bold">{ words()[currentWordIndex()] }</h1>

                        <div class="fixed bottom-[70px] w-full px-4">
                            <div class="w-full flex justify-around gap-4">
                                <button
                                    class="btn btn-error w-32 md:w-sm"
                                    on:click={ () => setIndexStatus(false) }
                                >Incorrect ❌</button>
                                <button
                                    class="btn btn-success w-32 md:w-sm"
                                    on:click={ () => setIndexStatus(true) }
                                >Correct ✅</button>
                            </div>

                            <ul class="flex items-center justify-center gap-4 flex-wrap mt-4">
                                <For each={words()}>
                                    {
                                        (word, index) => (
                                            <li>
                                                <div class="timeline-middle">
                                                    <Show when={wordsStatus()[index()] !== undefined}>
                                                        <Show when={wordsStatus()[index()]}>
                                                            <span class="badge badge-success badge-lg">
                                                                <span class="w-[1em]" innerHTML={ CheckSvg }></span>
                                                            </span>
                                                        </Show>
                                                        <Show when={!wordsStatus()[index()]}>
                                                            <span class="badge badge-error badge-lg">
                                                                <span class="w-[1em]" innerHTML={ CrossSvg }></span>
                                                            </span>
                                                        </Show>
                                                    </Show>

                                                    <Show when={wordsStatus()[index()] === undefined}>
                                                        <span class="badge badge-soft badge-neutral badge-lg">-</span>
                                                    </Show>
                                                </div>
                                            </li>
                                        )
                                    }
                                </For>
                            </ul>
                        </div>
                    </Show>

                    <Show when={wordsStatus().length === words().length}>
                        <div class="text-center">
                            <h1 class="font-bold text-4xl text-success">Congrats!</h1>
                            <p class="mt-4">Let's see how you did:</p>
                            <p class="mt-4 text-3xl font-semibold">{ correctAnswers() } / { words().length }</p>
                        </div>
                    </Show>
                </Show>

                
                <div class="dock dock-sm">
                    <button on:click={() => reset()}>
                        <div innerHTML={ ResetSvg } class="h-6 w-6"></div>
                    </button>
                    
                    <button>
                        <Drawer
                            id="edit"
                            drawerContent={
                                <div innerHTML={ PencilSvg } class="h-6 w-6"></div>
                            }
                        >
                            <div class="h-full grid grid-rows-[1fr_auto]">
                                <List items={wordSignal} />
                                <label for="edit" class="btn btn-lg btn-secondary">Close</label>
                            </div>
                        </Drawer>
                    </button>
                    
                    <label>
                        <div class="swap swap-rotate">
                            <input type="checkbox" class="hidden theme-controller" value="dark" />

                            <svg
                                class="swap-off h-6 w-6 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            <svg
                                class="swap-on h-6 w-6 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </div>
                    </label>

                </div>
            </div>
        </>
    )
}