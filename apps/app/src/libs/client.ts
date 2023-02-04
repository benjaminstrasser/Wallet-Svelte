import {ethers} from "ethers"
import {signer} from "./blockchain";
// import {TransactionRequest} from "@ethersproject/abstract-provider";

// https://docs.ethers.io/v5/api/providers/other/#Web3Provider--ExternalProvider
export class WalletProvider implements ethers.providers.ExternalProvider {
    isMetaMask = false;
    isStatus?: boolean;
    host?: string;
    path?: string;

    provider: ethers.providers.JsonRpcProvider

    signer: ethers.Wallet

    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(" http://localhost:8545")
        this.signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", this.provider)
    }

    // sendAsync(request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void): void {
    //     this.provider.send(request.method, request.params ?? [])
    //         .then(value => {
    //             callback(undefined, value)
    //         })
    //         .catch(error => {
    //             callback(error, undefined)
    //         })
    // }
    //
    // send(request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void): void {
    //     this.provider.send(request.method, request.params ?? [])
    //         .then(value => {
    //             callback(undefined, value)
    //         })
    //         .catch(error => {
    //             callback(error, undefined)
    //         })
    // }


    //This follows the EIP-1193 API signature.
    async request(request: { method: string, params?: Array<any> }): Promise<any> {

        // const response = await this.provider.send(request.method, request.params ?? [])
        // console.log(`${request.method}: ${response}`);
        // return response;

        switch (request.method) {
            case "eth_accounts":
                return [this.signer.address]
             // case "eth_sendTransaction":
             //     // @ts-ignore
             //     return this.signer.sendTransaction(request.params)
            default:
                const response = await this.provider.send(request.method, request.params ?? [])
                console.log(`${request.method}: ${response}`);
                return response;
        }


    }
}
