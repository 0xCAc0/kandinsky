/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { IssuanceNode, IssuanceNodeInterface } from "../IssuanceNode";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nodeOwner",
        type: "address",
      },
      {
        internalType: "int128",
        name: "_gamma64x64",
        type: "int128",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DECIMALS",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EPOCH_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EXA",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ISSUANCE_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ONE_64x64",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SENTINEL_EPOCHS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TIME_BONUS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TIME_RESOLUTION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ZERO_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenHolder",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenHolder",
        type: "address",
      },
    ],
    name: "balanceOfWithTime",
    outputs: [
      {
        internalType: "uint256",
        name: "balance_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "unixTimestamp_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "beta64x64",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "creationTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentEpochAndOffset",
    outputs: [
      {
        internalType: "uint256",
        name: "epoch_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "offset_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "epochBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "epochTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gamma64x64",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gammaIssuance64x64",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "holderEpochs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_node",
        type: "address",
      },
    ],
    name: "isTrusted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
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
    name: "lastEpochOffsets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    name: "lastEpochs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastIssuanceTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nodeOwner",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_offset",
        type: "uint256",
      },
    ],
    name: "timeLapseSinceEpochOffset",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6101206040523480156200001257600080fd5b50604051620016523803806200165283398101604081905262000035916200072a565b81816001600160a01b038216620000a25760405162461bcd60e51b815260206004820152602660248201527f497373756520736f75726365206d757374206e6f74206265206e756c6c206164604482015265323932b9b99760d11b60648201526084015b60405180910390fd5b68010000000000000000600f82900b12620001115760405162461bcd60e51b815260206004820152602860248201527f47616d6d61206d757374206265207374726963746c7920736d616c6c657220746044820152673430b71037b7329760c11b606482015260840162000099565b600080546001600160a01b0319166001600160a01b03841617815562000136620002af565b60808190526001819055600f83900b60a052905060006200016683610e10620002e1602090811b6200067e17901c565b905080600f0b60c081600f0b815250506000620001ad6200019c68010000000000000000846200053060201b620008fb1760201c565b6200056d60201b620009481760201c565b600f81900b60e05290506000620001d6620001ce610e106202a300620007a6565b8484620005c9565b9050600080620001e562000642565b6001600160a01b03998a166000818152600560209081526040808320868452825280832089905592825260038152828220859055600481528282209390935560028352818120818052909252902055505060065550506007555082166200029b5760405162461bcd60e51b8152602060048201526024808201527f4e6f6465206f776e6572206d757374206e6f74206265206e756c6c206164647260448201526332b9b99760e11b606482015260840162000099565b506001600160a01b03166101005262000805565b6000607880620002c46361b2988042620007c9565b620002d09190620007a6565b620002dc9190620007e3565b905090565b600080600084600f0b128015620002fb5750826001166001145b905060008085600f0b1262000311578462000316565b846000035b6001600160801b03169050600160801b680100000000000000008211620003b857603f82901b91505b8415620003af57600185161562000356578102607f1c5b908002607f1c9060028516156200036d578102607f1c5b908002607f1c90600485161562000384578102607f1c5b908002607f1c9060088516156200039b578102607f1c5b60049490941c93908002607f1c906200033f565b60401c620004e4565b603f6c01000000000000000000000000831015620003dc5760209290921b91601f19015b600160701b831015620003f55760109290921b91600f19015b600160781b8310156200040e5760089290921b91600719015b6001607c1b831015620004275760049290921b91600319015b6001607e1b831015620004405760029290921b91600119015b6001607f1b831015620004595760019290921b91600019015b60005b8615620004cc57604082106200047157600080fd5b60018716156200049957918302607f1c918101600160801b8311156200049957600192831c92015b928002607f1c9260019190911b90600160801b8410620004bf57600193841c9391909101905b600187901c96506200045c565b60408110620004da57600080fd5b6040039190911c90505b600083620004f35781620004f8565b816000035b905060016001607f1b031981128015906200051a575060016001607f1b038113155b6200052457600080fd5b93505050505b92915050565b6000600f82810b9084900b0360016001607f1b031981128015906200055c575060016001607f1b038113155b6200056657600080fd5b9392505050565b600081600f0b600014156200058157600080fd5b600082600f0b600160801b816200059c576200059c6200077a565b05905060016001607f1b03198112801590620005bf575060016001607f1b038113155b6200052a57600080fd5b600080620006186200060668010000000000000000620005f58789620002e160201b6200067e1760201c565b6200053060201b620008fb1760201c565b846200068560201b620009b01760201c565b90506200063981670de0b6b3a7640000620006bd60201b620009f81760201c565b95945050505050565b6000808062000650620002af565b90506200066162093a8082620007a6565b92506200067262093a8084620007e3565b6200067e9082620007c9565b9150509091565b6000600f83810b9083900b0260401d60016001607f1b031981128015906200055c575060016001607f1b038113156200056657600080fd5b600081620006ce575060006200052a565b600083600f0b1215620006e057600080fd5b600f83900b6001600160801b038316810260401c90608084901c026001600160c01b038111156200071057600080fd5b60401b81198111156200072257600080fd5b019392505050565b600080604083850312156200073e57600080fd5b82516001600160a01b03811681146200075657600080fd5b80925050602083015180600f0b81146200076f57600080fd5b809150509250929050565b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082620007c457634e487b7160e01b600052601260045260246000fd5b500490565b600082821015620007de57620007de62000790565b500390565b600081600019048311821515161562000800576200080062000790565b500290565b60805160a05160c05160e05161010051610df36200085f60003960006102230152600061030e015260006101cf0152600081816103ac01528181610acf01528181610b0e0152610c3d015260006104040152610df36000f3fe608060405234801561001057600080fd5b50600436106101a35760003560e01c806388eb7d95116100ee5780639926a74f11610097578063bf463c5211610071578063bf463c52146103e1578063c9cbfc09146103f4578063d8270dce146103ff578063ea7267e71461042657600080fd5b80639926a74f146103a7578063992cdefd146103ce578063a70b9f0c146103d757600080fd5b80638f4a0ae8116100c85780638f4a0ae814610350578063933eb7b51461037b57806396d648791461038357600080fd5b806388eb7d95146102f95780638cd30caa146103095780638e0fbf691461033057600080fd5b806352d1bb69116101505780636c749c261161012a5780636c749c26146102cf57806370a08231146102de57806378d0410e146102f157600080fd5b806352d1bb691461027b57806360bf03ff146102a6578063672065ba146102af57600080fd5b806346ca28941161018157806346ca28941461021e5780635053e4611461025d578063516d6e271461027357600080fd5b80630ab38557146101a85780631f164c63146101ca5780632e0f262514610204575b600080fd5b6101b0610439565b604080519283526020830191909152015b60405180910390f35b6101f17f000000000000000000000000000000000000000000000000000000000000000081565b604051600f9190910b81526020016101c1565b61020c601281565b60405160ff90911681526020016101c1565b6102457f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016101c1565b610265610475565b6040519081526020016101c1565b6102656104a1565b610265610289366004610ce3565b600560209081526000928352604080842090915290825290205481565b61026560015481565b6102656102bd366004610d0d565b60036020526000908152604090205481565b610265670de0b6b3a764000081565b6102656102ec366004610d0d565b6104b3565b610265607881565b6101f16801000000000000000081565b6101f17f000000000000000000000000000000000000000000000000000000000000000081565b61026561033e366004610d0d565b60046020526000908152604090205481565b61026561035e366004610ce3565b600260209081526000928352604080842090915290825290205481565b610265600081565b610397610391366004610d0d565b50600090565b60405190151581526020016101c1565b6101f17f000000000000000000000000000000000000000000000000000000000000000081565b610265610e1081565b61026562093a8081565b6101b06103ef366004610d0d565b610512565b6102656361b2988081565b6102657f000000000000000000000000000000000000000000000000000000000000000081565b610265610434366004610d28565b61058d565b6000806000610446610475565b905061045562093a8082610d76565b925061046462093a8084610d98565b61046e9082610db7565b9150509091565b60006078806104886361b2988042610db7565b6104929190610d76565b61049c9190610d98565b905090565b6104b0610e106202a300610d76565b81565b6001600160a01b038116600090815260036020526040812054806104da5750600092915050565b6001600160a01b0383166000908152600460205260408120546104fe90839061058d565b905061050a8482610a7a565b949350505050565b6001600160a01b0381166000908152600360205260408120548190610535610475565b610543906361b29880610dce565b915080610554576000925050915091565b6001600160a01b03841660009081526004602052604081205461057890839061058d565b90506105848582610a7a565b93505050915091565b600080610598610439565b509050808411156105f05760405162461bcd60e51b815260206004820152601f60248201527f45706f63682063616e6e6f74206c696520696e20746865206675747572652e0060448201526064015b60405180910390fd5b60006105fa610475565b905060008461060c62093a8088610d98565b6106169190610dce565b9050818111156106685760405162461bcd60e51b815260206004820181905260248201527f4f66667365742063616e6e6f74206c696520696e20746865206675747572652e60448201526064016105e7565b6106728183610db7565b93505050505b92915050565b600080600084600f0b1280156106975750826001166001145b905060008085600f0b126106ab57846106b0565b846000035b6fffffffffffffffffffffffffffffffff169050600160801b68010000000000000000821161075357603f82901b91505b841561074b5760018516156106f6578102607f1c5b908002607f1c90600285161561070c578102607f1c5b908002607f1c906004851615610722578102607f1c5b908002607f1c906008851615610738578102607f1c5b60049490941c93908002607f1c906106e1565b60401c6108ad565b603f6c010000000000000000000000008310156107765760209290921b91601f19015b6e0100000000000000000000000000008310156107995760109290921b91600f19015b6f010000000000000000000000000000008310156107bd5760089290921b91600719015b6f100000000000000000000000000000008310156107e15760049290921b91600319015b6f400000000000000000000000000000008310156108055760029290921b91600119015b6f800000000000000000000000000000008310156108295760019290921b91600019015b60005b8615610896576040821061083f57600080fd5b600187161561086557918302607f1c918101600160801b83111561086557600192831c92015b928002607f1c9260019190911b90600160801b841061088a57600193841c9391909101905b600187901c965061082c565b604081106108a357600080fd5b6040039190911c90505b6000836108ba57816108bf565b816000035b90506f7fffffffffffffffffffffffffffffff1981128015906108f257506f7fffffffffffffffffffffffffffffff8113155b61067257600080fd5b6000600f82810b9084900b036f7fffffffffffffffffffffffffffffff19811280159061093857506f7fffffffffffffffffffffffffffffff8113155b61094157600080fd5b9392505050565b600081600f0b6000141561095b57600080fd5b600082600f0b600160801b8161097357610973610d4a565b0590506f7fffffffffffffffffffffffffffffff1981128015906109a757506f7fffffffffffffffffffffffffffffff8113155b61067857600080fd5b6000600f83810b9083900b0260401d6f7fffffffffffffffffffffffffffffff19811280159061093857506f7fffffffffffffffffffffffffffffff81131561094157600080fd5b600081610a0757506000610678565b600083600f0b1215610a1857600080fd5b600f83900b6fffffffffffffffffffffffffffffffff8316810260401c90608084901c0277ffffffffffffffffffffffffffffffffffffffffffffffff811115610a6157600080fd5b60401b8119811115610a7257600080fd5b019392505050565b6001600160a01b0382166000908152600360209081526040808320546005835281842081855290925282205482610af3610ab48785610b3b565b6001600160a01b0388166000908152600460205260409020547f0000000000000000000000000000000000000000000000000000000000000000610ca5565b9050610aff8183610dce565b93508415610b325761067284867f0000000000000000000000000000000000000000000000000000000000000000610ca5565b50505092915050565b6001600160a01b038216600090815260036020526040812054821115610baf5760405162461bcd60e51b8152602060048201526024808201527f45706f6368206d757374206265206e6f7420657863656564206c61737420657060448201526337b1b41760e11b60648201526084016105e7565b506001600160a01b03821660009081526002602090815260408083208380529091528120545b8281108015610be357508015155b15610c9e57600062093a806001610bfa8487610db7565b610c049190610db7565b610c0e9190610d98565b6001600160a01b038616600090815260056020908152604080832086845290915281205491925090610c6190837f0000000000000000000000000000000000000000000000000000000000000000610ca5565b9050610c6d8185610dce565b6001600160a01b03871660009081526002602090815260408083209683529590529390932054929350610bd5915050565b5092915050565b600080610cb2838561067e565b9050610cbe81866109f8565b95945050505050565b80356001600160a01b0381168114610cde57600080fd5b919050565b60008060408385031215610cf657600080fd5b610cff83610cc7565b946020939093013593505050565b600060208284031215610d1f57600080fd5b61094182610cc7565b60008060408385031215610d3b57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082610d9357634e487b7160e01b600052601260045260246000fd5b500490565b6000816000190483118215151615610db257610db2610d60565b500290565b600082821015610dc957610dc9610d60565b500390565b60008219821115610de157610de1610d60565b50019056fea164736f6c6343000809000a";

type IssuanceNodeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IssuanceNodeConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class IssuanceNode__factory extends ContractFactory {
  constructor(...args: IssuanceNodeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "IssuanceNode";
  }

  deploy(
    _nodeOwner: string,
    _gamma64x64: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<IssuanceNode> {
    return super.deploy(
      _nodeOwner,
      _gamma64x64,
      overrides || {},
    ) as Promise<IssuanceNode>;
  }
  getDeployTransaction(
    _nodeOwner: string,
    _gamma64x64: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(_nodeOwner, _gamma64x64, overrides || {});
  }
  attach(address: string): IssuanceNode {
    return super.attach(address) as IssuanceNode;
  }
  connect(signer: Signer): IssuanceNode__factory {
    return super.connect(signer) as IssuanceNode__factory;
  }
  static readonly contractName: "IssuanceNode";
  public readonly contractName: "IssuanceNode";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IssuanceNodeInterface {
    return new utils.Interface(_abi) as IssuanceNodeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IssuanceNode {
    return new Contract(address, _abi, signerOrProvider) as IssuanceNode;
  }
}
