<script lang="ts">
    import { ethers } from "ethers";
    import { getShare, postShare } from "../../libs/nodes";
    import { generateShares, recoverSeceret } from "../../libs/crypto/shamir-secret-sharing";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';


    let mnemonic: string
    let shares: Array<Uint8Array>

    
    let serverShares: (Uint8Array | undefined)[] = []

    async function generateMnemonic(){
        //mnemonic = ethers.Wallet.createRandom().mnemonic.phrase
        mnemonic = "bus install include robust seek genius news awful express diamond total orchard"
        shares = generateShares(mnemonic)

        recoverSeceret(shares)

        serverShares = [
            (await getShare(1)).share,
            (await getShare(2)).share,
            (await getShare(3)).share
        ]

        shares.forEach((share, i) => {
            if(share !== serverShares[i]){
                serverShares[i] = undefined
            }
        })

    }

    async function register(id: number) {
        const share = shares[id-1]
        const response = await postShare(id, share)
        serverShares[id-1] = share
    }


    let allRegistered = false
    $: allRegistered = serverShares[0] != undefined && serverShares[1] != undefined && serverShares[2] != undefined
</script>
<h1 style="">Wallet Registration</h1>

<button on:click={generateMnemonic}>Generate Mnemonic</button>
<input style="text-align:center;" type="text" disabled  bind:value={mnemonic}/>


{#if mnemonic}
<div class="grid">
    {#if !serverShares[0]}
        <button on:click={() => register(1)}>Register Node 1</button>
    {:else}
        <button disabled>Already Registered Node 1</button>
    {/if}

    {#if !serverShares[1]}
        <button on:click={() => register(2)}>Register Node 2</button>
    {:else}
        <button disabled>Already Registered Node 2</button>
    {/if}

    {#if !serverShares[2]}
        <button on:click={() => register(3)}>Register Node 3</button>
    {:else}
        <button disabled>Already Registered Node 3</button>
    {/if}
    </div>
{/if}

{#if allRegistered == true}
     <button on:click={() => goto("/")}>Continue to Wallet</button>
{/if}


