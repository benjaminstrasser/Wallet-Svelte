import { generateShares } from "../crypto/shamir-secret-sharing";


export async function postShare(id: number, share: Uint8Array){
    return (await fetch(`http://localhost:9090/api/${id}`, {
        method: "POST",
        body: JSON.stringify({
            share: share
        })
    })).json()
}

export async function getShare(id: number) {
    const result = await fetch(`http://localhost:9090/api/${id}`, {
        method: "GET",
    })
    return result.json()
}