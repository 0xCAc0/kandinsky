/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface PatchInterface extends utils.Interface {
  contractName: "Patch";
  functions: {
    "deposit()": FunctionFragment;
    "distance(address[])": FunctionFragment;
    "tierZero(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(functionFragment: "distance", values: [string[]]): string;
  encodeFunctionData(functionFragment: "tierZero", values: [string]): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "distance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tierZero", data: BytesLike): Result;

  events: {};
}

export interface Patch extends BaseContract {
  contractName: "Patch";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PatchInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deposit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    distance(
      _path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tierZero(arg0: string, overrides?: CallOverrides): Promise<[string]>;
  };

  deposit(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  distance(
    _path: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tierZero(arg0: string, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    deposit(overrides?: CallOverrides): Promise<void>;

    distance(_path: string[], overrides?: CallOverrides): Promise<BigNumber>;

    tierZero(arg0: string, overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    deposit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    distance(
      _path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tierZero(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    distance(
      _path: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tierZero(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
