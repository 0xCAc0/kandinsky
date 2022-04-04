/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface DiscountedBalanceInterface extends utils.Interface {
  contractName: "DiscountedBalance";
  functions: {
    "DECIMALS()": FunctionFragment;
    "EPOCH_DURATION()": FunctionFragment;
    "EXA()": FunctionFragment;
    "ISSUANCE_PERIOD()": FunctionFragment;
    "ONE_64x64()": FunctionFragment;
    "SENTINEL_EPOCHS()": FunctionFragment;
    "TIME_BONUS()": FunctionFragment;
    "TIME_RESOLUTION()": FunctionFragment;
    "ZERO_TIME()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "balanceOfWithTime(address)": FunctionFragment;
    "beta64x64()": FunctionFragment;
    "creationTime()": FunctionFragment;
    "currentEpochAndOffset()": FunctionFragment;
    "epochBalances(address,uint256)": FunctionFragment;
    "epochTime()": FunctionFragment;
    "gamma64x64()": FunctionFragment;
    "gammaIssuance64x64()": FunctionFragment;
    "holderEpochs(address,uint256)": FunctionFragment;
    "lastEpochOffsets(address)": FunctionFragment;
    "lastEpochs(address)": FunctionFragment;
    "lastIssuanceTime()": FunctionFragment;
    "timeLapseSinceEpochOffset(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "DECIMALS", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "EPOCH_DURATION",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "EXA", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ISSUANCE_PERIOD",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ONE_64x64", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "SENTINEL_EPOCHS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TIME_BONUS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TIME_RESOLUTION",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ZERO_TIME", values?: undefined): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "balanceOfWithTime",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "beta64x64", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "creationTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentEpochAndOffset",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "epochBalances",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "epochTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "gamma64x64",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "gammaIssuance64x64",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "holderEpochs",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lastEpochOffsets",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "lastEpochs", values: [string]): string;
  encodeFunctionData(
    functionFragment: "lastIssuanceTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeLapseSinceEpochOffset",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "DECIMALS", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "EPOCH_DURATION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "EXA", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ISSUANCE_PERIOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ONE_64x64", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "SENTINEL_EPOCHS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "TIME_BONUS", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "TIME_RESOLUTION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ZERO_TIME", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfWithTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "beta64x64", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "creationTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentEpochAndOffset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "epochBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "epochTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gamma64x64", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "gammaIssuance64x64",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "holderEpochs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastEpochOffsets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lastEpochs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastIssuanceTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timeLapseSinceEpochOffset",
    data: BytesLike
  ): Result;

  events: {};
}

export interface DiscountedBalance extends BaseContract {
  contractName: "DiscountedBalance";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DiscountedBalanceInterface;

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
    DECIMALS(overrides?: CallOverrides): Promise<[number]>;

    EPOCH_DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;

    EXA(overrides?: CallOverrides): Promise<[BigNumber]>;

    ISSUANCE_PERIOD(overrides?: CallOverrides): Promise<[BigNumber]>;

    ONE_64x64(overrides?: CallOverrides): Promise<[BigNumber]>;

    SENTINEL_EPOCHS(overrides?: CallOverrides): Promise<[BigNumber]>;

    TIME_BONUS(overrides?: CallOverrides): Promise<[BigNumber]>;

    TIME_RESOLUTION(overrides?: CallOverrides): Promise<[BigNumber]>;

    ZERO_TIME(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOf(
      _tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    balanceOfWithTime(
      _tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        balance_: BigNumber;
        unixTimestamp_: BigNumber;
      }
    >;

    beta64x64(overrides?: CallOverrides): Promise<[BigNumber]>;

    creationTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    currentEpochAndOffset(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { epoch_: BigNumber; offset_: BigNumber }
    >;

    epochBalances(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    epochTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    gamma64x64(overrides?: CallOverrides): Promise<[BigNumber]>;

    gammaIssuance64x64(overrides?: CallOverrides): Promise<[BigNumber]>;

    holderEpochs(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lastEpochOffsets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lastEpochs(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    lastIssuanceTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    timeLapseSinceEpochOffset(
      _epoch: BigNumberish,
      _offset: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  DECIMALS(overrides?: CallOverrides): Promise<number>;

  EPOCH_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

  EXA(overrides?: CallOverrides): Promise<BigNumber>;

  ISSUANCE_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

  ONE_64x64(overrides?: CallOverrides): Promise<BigNumber>;

  SENTINEL_EPOCHS(overrides?: CallOverrides): Promise<BigNumber>;

  TIME_BONUS(overrides?: CallOverrides): Promise<BigNumber>;

  TIME_RESOLUTION(overrides?: CallOverrides): Promise<BigNumber>;

  ZERO_TIME(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOf(
    _tokenHolder: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOfWithTime(
    _tokenHolder: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { balance_: BigNumber; unixTimestamp_: BigNumber }
  >;

  beta64x64(overrides?: CallOverrides): Promise<BigNumber>;

  creationTime(overrides?: CallOverrides): Promise<BigNumber>;

  currentEpochAndOffset(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { epoch_: BigNumber; offset_: BigNumber }
  >;

  epochBalances(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  epochTime(overrides?: CallOverrides): Promise<BigNumber>;

  gamma64x64(overrides?: CallOverrides): Promise<BigNumber>;

  gammaIssuance64x64(overrides?: CallOverrides): Promise<BigNumber>;

  holderEpochs(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lastEpochOffsets(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  lastEpochs(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  lastIssuanceTime(overrides?: CallOverrides): Promise<BigNumber>;

  timeLapseSinceEpochOffset(
    _epoch: BigNumberish,
    _offset: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    DECIMALS(overrides?: CallOverrides): Promise<number>;

    EPOCH_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    EXA(overrides?: CallOverrides): Promise<BigNumber>;

    ISSUANCE_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_64x64(overrides?: CallOverrides): Promise<BigNumber>;

    SENTINEL_EPOCHS(overrides?: CallOverrides): Promise<BigNumber>;

    TIME_BONUS(overrides?: CallOverrides): Promise<BigNumber>;

    TIME_RESOLUTION(overrides?: CallOverrides): Promise<BigNumber>;

    ZERO_TIME(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(
      _tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfWithTime(
      _tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        balance_: BigNumber;
        unixTimestamp_: BigNumber;
      }
    >;

    beta64x64(overrides?: CallOverrides): Promise<BigNumber>;

    creationTime(overrides?: CallOverrides): Promise<BigNumber>;

    currentEpochAndOffset(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { epoch_: BigNumber; offset_: BigNumber }
    >;

    epochBalances(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    epochTime(overrides?: CallOverrides): Promise<BigNumber>;

    gamma64x64(overrides?: CallOverrides): Promise<BigNumber>;

    gammaIssuance64x64(overrides?: CallOverrides): Promise<BigNumber>;

    holderEpochs(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastEpochOffsets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastEpochs(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    lastIssuanceTime(overrides?: CallOverrides): Promise<BigNumber>;

    timeLapseSinceEpochOffset(
      _epoch: BigNumberish,
      _offset: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    DECIMALS(overrides?: CallOverrides): Promise<BigNumber>;

    EPOCH_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    EXA(overrides?: CallOverrides): Promise<BigNumber>;

    ISSUANCE_PERIOD(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_64x64(overrides?: CallOverrides): Promise<BigNumber>;

    SENTINEL_EPOCHS(overrides?: CallOverrides): Promise<BigNumber>;

    TIME_BONUS(overrides?: CallOverrides): Promise<BigNumber>;

    TIME_RESOLUTION(overrides?: CallOverrides): Promise<BigNumber>;

    ZERO_TIME(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(
      _tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfWithTime(
      _tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    beta64x64(overrides?: CallOverrides): Promise<BigNumber>;

    creationTime(overrides?: CallOverrides): Promise<BigNumber>;

    currentEpochAndOffset(overrides?: CallOverrides): Promise<BigNumber>;

    epochBalances(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    epochTime(overrides?: CallOverrides): Promise<BigNumber>;

    gamma64x64(overrides?: CallOverrides): Promise<BigNumber>;

    gammaIssuance64x64(overrides?: CallOverrides): Promise<BigNumber>;

    holderEpochs(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastEpochOffsets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastEpochs(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    lastIssuanceTime(overrides?: CallOverrides): Promise<BigNumber>;

    timeLapseSinceEpochOffset(
      _epoch: BigNumberish,
      _offset: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DECIMALS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    EPOCH_DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    EXA(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ISSUANCE_PERIOD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ONE_64x64(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SENTINEL_EPOCHS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TIME_BONUS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TIME_RESOLUTION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ZERO_TIME(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      _tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOfWithTime(
      _tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    beta64x64(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    creationTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentEpochAndOffset(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    epochBalances(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    epochTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gamma64x64(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gammaIssuance64x64(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    holderEpochs(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastEpochOffsets(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastEpochs(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastIssuanceTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timeLapseSinceEpochOffset(
      _epoch: BigNumberish,
      _offset: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
