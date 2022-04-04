/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Patch, PatchInterface } from "../Patch";

const _abi = [
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
    ],
    name: "distance",
    outputs: [
      {
        internalType: "uint256",
        name: "distance_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tierZero",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class Patch__factory {
  static readonly abi = _abi;
  static createInterface(): PatchInterface {
    return new utils.Interface(_abi) as PatchInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Patch {
    return new Contract(address, _abi, signerOrProvider) as Patch;
  }
}
