<script lang="ts">
    import { ethers } from "ethers";
    import { onMount } from "svelte";
    import { debug } from "svelte/internal";
    import { provider } from "../libs/blockchain";
    import {recoverSeceret, generateShares } from "../libs/crypto/shamir-secret-sharing";
    import { getShare } from "../libs/nodes";

    
    let serverShares: {[key: number]: Uint8Array} = {};
    let mnemonic: string;
    let wallet: ethers.Wallet

    async function load(id: number) {
        //serverShares[id-1] = new Uint8Array((await getShare(id)).share.data)
        serverShares[id-1] = sampleSecret[id-1]
        update()
    }

    let sampleSecret = generateShares("bus install include robust seek genius news awful express diamond total orchard");

    function update() {
        try{
            let uint8shares = Object.values(serverShares) as Uint8Array[]
            let interMmnemonic = recoverSeceret(uint8shares).toString();
            wallet = ethers.Wallet.fromMnemonic(interMmnemonic)
            mnemonic = interMmnemonic
        } catch(e) {
        }

        let address
    }

    $: address = wallet?.address
</script>

<h1>Your Wallet</h1>

{#if !mnemonic}
<div class="grid">
    {#if !serverShares[0]}
        <button on:click={() => load(1)}>Load Node 1</button>
    {:else}
        <button disabled>Already Loaded Node 1</button>
    {/if}

    {#if !serverShares[1]}
        <button on:click={() => load(2)}>Load Node 2</button>
    {:else}
        <button disabled>Already Loaded Node 2</button>
    {/if}

    {#if !serverShares[2]}
        <button on:click={() => load(3)}>Load Node 3</button>
    {:else}
        <button disabled>Already Loaded Node 3</button>
    {/if}
    </div>
{/if}

{#if mnemonic}
    <div class="grid">
        <div>Address: {address}</div>
        <div>Balance: 0.000000000000000000 Ether</div>
        
    </div>

     <article>
        <header>Pending Transactions</header>
    </article>
{/if}
