import { split, combine } from 'shamirs-secret-sharing-ts'
 

export function generateShares(secret: string): Array<Uint8Array>{
    const secretBuffer = Buffer.from(secret)
    const shares = split(secretBuffer, { shares: 3, threshold: 2 })
    return shares
}

export function recoverSeceret(shares: Array<Uint8Array>){
    return combine(shares)
}