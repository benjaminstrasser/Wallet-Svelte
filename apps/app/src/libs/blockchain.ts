import {ethers} from "ethers";
import {WalletProvider} from "./client";
import {Greeter__factory} from "../../../hardhat/typechain-types"
import {deploymentAddresses} from "../../../hardhat/deployment-info"


export const provider = new ethers.providers.Web3Provider(new WalletProvider())

export const signer = provider.getSigner();

export const greeter = Greeter__factory.connect(deploymentAddresses.greeter, signer)
