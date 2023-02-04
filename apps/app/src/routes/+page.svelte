<script type="ts">
    import {greeter, provider} from "../libs/blockchain";

    export const ssr = false;

    let block = provider.getBlockNumber();
    let greeting = greeter.greet();

    let newGreeting = ""

    async function setGreeting() {
        const response = await greeter.setGreeting(newGreeting);
        await response.wait();
        block = provider.getBlockNumber();
        greeting = greeter.greet();
    }


</script>

{#await greeting}
    <h1>...waiting for greeting</h1>
{:then greeting}
    <h1>{greeting}</h1>
{:catch error}
    <h1 style="color: red">{error.message}</h1>
{/await}
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#await block}
    <p>...waiting for block</p>
{:then number}
    <p>The block is {number}</p>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<input bind:value={newGreeting}>
<button on:click={setGreeting}>Set Greeting</button>
