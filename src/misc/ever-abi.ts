/* eslint-disable sort-keys */

export const TokenRoot = {
  "ABI version": 2,
  version: "2.2",
  header: ["pubkey", "time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [
        {
          name: "initialSupplyTo",
          type: "address",
        },
        {
          name: "initialSupply",
          type: "uint128",
        },
        {
          name: "deployWalletValue",
          type: "uint128",
        },
        {
          name: "mintDisabled",
          type: "bool",
        },
        {
          name: "burnByRootDisabled",
          type: "bool",
        },
        {
          name: "burnPaused",
          type: "bool",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
      ],
      outputs: [],
    },
    {
      name: "supportsInterface",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "interfaceID",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      name: "disableMint",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      name: "mintDisabled",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      name: "burnTokens",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "walletOwner",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "callbackTo",
          type: "address",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "disableBurnByRoot",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      name: "burnByRootDisabled",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      name: "burnPaused",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      name: "setBurnPaused",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "paused",
          type: "bool",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      name: "transferOwnership",
      inputs: [
        {
          name: "newOwner",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          components: [
            {
              name: "value",
              type: "uint128",
            },
            {
              name: "payload",
              type: "cell",
            },
          ],
          name: "callbacks",
          type: "map(address,tuple)",
        },
      ],
      outputs: [],
    },
    {
      name: "name",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "string",
        },
      ],
    },
    {
      name: "symbol",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "string",
        },
      ],
    },
    {
      name: "decimals",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "uint8",
        },
      ],
    },
    {
      name: "totalSupply",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "uint128",
        },
      ],
    },
    {
      name: "walletCode",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "cell",
        },
      ],
    },
    {
      name: "rootOwner",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "address",
        },
      ],
    },
    {
      name: "walletOf",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "walletOwner",
          type: "address",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "address",
        },
      ],
    },
    {
      name: "deployWallet",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "walletOwner",
          type: "address",
        },
        {
          name: "deployWalletValue",
          type: "uint128",
        },
      ],
      outputs: [
        {
          name: "tokenWallet",
          type: "address",
        },
      ],
    },
    {
      name: "mint",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "deployWalletValue",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "acceptBurn",
      id: "0x192B51B1",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "walletOwner",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "callbackTo",
          type: "address",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "sendSurplusGas",
      inputs: [
        {
          name: "to",
          type: "address",
        },
      ],
      outputs: [],
    },
  ],
  data: [
    {
      key: 1,
      name: "name_",
      type: "string",
    },
    {
      key: 2,
      name: "symbol_",
      type: "string",
    },
    {
      key: 3,
      name: "decimals_",
      type: "uint8",
    },
    {
      key: 4,
      name: "rootOwner_",
      type: "address",
    },
    {
      key: 5,
      name: "walletCode_",
      type: "cell",
    },
    {
      key: 6,
      name: "randomNonce_",
      type: "uint256",
    },
    {
      key: 7,
      name: "deployer_",
      type: "address",
    },
  ],
  events: [],
  fields: [
    {
      name: "_pubkey",
      type: "uint256",
    },
    {
      name: "_timestamp",
      type: "uint64",
    },
    {
      name: "_constructorFlag",
      type: "bool",
    },
    {
      name: "name_",
      type: "string",
    },
    {
      name: "symbol_",
      type: "string",
    },
    {
      name: "decimals_",
      type: "uint8",
    },
    {
      name: "rootOwner_",
      type: "address",
    },
    {
      name: "walletCode_",
      type: "cell",
    },
    {
      name: "totalSupply_",
      type: "uint128",
    },
    {
      name: "burnPaused_",
      type: "bool",
    },
    {
      name: "burnByRootDisabled_",
      type: "bool",
    },
    {
      name: "mintDisabled_",
      type: "bool",
    },
    {
      name: "randomNonce_",
      type: "uint256",
    },
    {
      name: "deployer_",
      type: "address",
    },
  ],
} as const;

export const TokenWallet = {
  "ABI version": 2,
  version: "2.2",
  header: ["pubkey", "time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [],
      outputs: [],
    },
    {
      name: "supportsInterface",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "interfaceID",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      name: "destroy",
      inputs: [
        {
          name: "remainingGasTo",
          type: "address",
        },
      ],
      outputs: [],
    },
    {
      name: "burnByRoot",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "callbackTo",
          type: "address",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "burn",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "callbackTo",
          type: "address",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "balance",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "uint128",
        },
      ],
    },
    {
      name: "owner",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "address",
        },
      ],
    },
    {
      name: "root",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "address",
        },
      ],
    },
    {
      name: "walletCode",
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      outputs: [
        {
          name: "value0",
          type: "cell",
        },
      ],
    },
    {
      name: "transfer",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "deployWalletValue",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "transferToWallet",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "recipientTokenWallet",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "acceptTransfer",
      id: "0x67A0B95F",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "sender",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "acceptMint",
      id: "0x4384F298",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      outputs: [],
    },
    {
      name: "sendSurplusGas",
      inputs: [
        {
          name: "to",
          type: "address",
        },
      ],
      outputs: [],
    },
  ],
  data: [
    {
      key: 1,
      name: "root_",
      type: "address",
    },
    {
      key: 2,
      name: "owner_",
      type: "address",
    },
  ],
  events: [],
  fields: [
    {
      name: "_pubkey",
      type: "uint256",
    },
    {
      name: "_timestamp",
      type: "uint64",
    },
    {
      name: "_constructorFlag",
      type: "bool",
    },
    {
      name: "root_",
      type: "address",
    },
    {
      name: "owner_",
      type: "address",
    },
    {
      name: "balance_",
      type: "uint128",
    },
  ],
} as const;

export const TokenProxy = {
  "ABI version": 2,
  version: "2.2",
  header: ["time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [
        {name: "owner", type: "address"},
        {name: "addrTezosEventConfiguration", type: "address"},
        {name: "addrEverscaleEventConfiguration", type: "address"},
        {name: "addrTokenRoot", type: "address"},
      ],
      outputs: [],
    },
    {
      name: "setConfiguration",
      inputs: [
        {name: "addrTezosEventConfiguration", type: "address"},
        {name: "addrEverscaleEventConfiguration", type: "address"},
        {name: "addrTokenRoot", type: "address"},
      ],
      outputs: [],
    },
    {
      name: "transferTokenCallback",
      inputs: [{name: "data", type: "cell"}],
      outputs: [],
    },
    {
      name: "burnTokenCallback",
      inputs: [
        {name: "amount", type: "uint128"},
        {name: "payload", type: "cell"},
      ],
      outputs: [],
    },
    {
      name: "onAcceptTokensBurn",
      inputs: [
        {name: "amount", type: "uint128"},
        {name: "walletOwner", type: "address"},
        {name: "wallet", type: "address"},
        {name: "remainingGasTo", type: "address"},
        {name: "payload", type: "cell"},
      ],
      outputs: [],
    },
    {
      name: "getInfo",
      inputs: [],
      outputs: [
        {name: "owner", type: "address"},
        {name: "addrTokenRoot", type: "address"},
        {name: "addrTezosEventConfiguration", type: "address"},
        {name: "addrEverscaleEventConfiguration", type: "address"},
      ],
    },
    {
      name: "encodeTezosEventData",
      inputs: [
        {name: "wid", type: "int8"},
        {name: "recipient", type: "uint256"},
        {name: "amount", type: "uint128"},
      ],
      outputs: [{name: "data", type: "cell"}],
    },
    {
      name: "decodeTezosEventData",
      inputs: [{name: "data", type: "cell"}],
      outputs: [
        {name: "wid", type: "int8"},
        {name: "recipient", type: "uint256"},
        {name: "amount", type: "uint128"},
      ],
    },
    {
      name: "encodeEverscaleEventData",
      inputs: [
        {name: "wid", type: "int8"},
        {name: "recipient", type: "uint256"},
        {name: "amount", type: "uint128"},
      ],
      outputs: [{name: "data", type: "cell"}],
    },
    {
      name: "decodeEverscaleEventData",
      inputs: [{name: "data", type: "cell"}],
      outputs: [
        {name: "wid", type: "int8"},
        {name: "recipient", type: "uint256"},
        {name: "amount", type: "uint128"},
      ],
    },
    {
      name: "encodePayload",
      inputs: [
        {name: "wid", type: "int8"},
        {name: "recipient", type: "uint256"},
      ],
      outputs: [{name: "data", type: "cell"}],
    },
    {
      name: "decodePayload",
      inputs: [{name: "data", type: "cell"}],
      outputs: [
        {name: "wid", type: "int8"},
        {name: "recipient", type: "uint256"},
      ],
    },
    {
      name: "encodeTezosAddrPayload",
      inputs: [{name: "recipient", type: "string"}],
      outputs: [{name: "data", type: "cell"}],
    },
    {
      name: "decodeTezosAddrPayload",
      inputs: [{name: "data", type: "cell"}],
      outputs: [{name: "recipient", type: "string"}],
    },
    {
      name: "encodeToTezosPayload",
      inputs: [
        {name: "recipient", type: "string"},
        {name: "amt", type: "uint128"},
      ],
      outputs: [{name: "data", type: "cell"}],
    },
    {
      name: "decodeToTezosPayload",
      inputs: [{name: "data", type: "cell"}],
      outputs: [
        {name: "recipient", type: "string"},
        {name: "amt", type: "uint128"},
      ],
    },
  ],
  data: [],
  events: [
    {
      name: "Withdraw",
      inputs: [
        {name: "wid", type: "int8"},
        {name: "recipient", type: "uint256"},
        {name: "amount", type: "uint128"},
      ],
      outputs: [],
    },
    {
      name: "ToTezos",
      inputs: [
        {name: "recipient", type: "string"},
        {name: "amount", type: "uint128"},
      ],
      outputs: [],
    },
  ],
  fields: [
    {name: "_pubkey", type: "uint256"},
    {name: "_timestamp", type: "uint64"},
    {name: "_constructorFlag", type: "bool"},
    {name: "_owner", type: "address"},
    {name: "_addrTokenRoot", type: "address"},
    {name: "_addrTezosEventConfiguration", type: "address"},
    {name: "_addrEverscaleEventConfiguration", type: "address"},
  ],
} as const;

export const MultisigWallet = {
  "ABI version": 2,
  header: ["pubkey", "time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [
        {name: "owners", type: "uint256[]"},
        {name: "reqConfirms", type: "uint8"},
      ],
      outputs: [],
    },
    {
      name: "acceptTransfer",
      inputs: [{name: "payload", type: "bytes"}],
      outputs: [],
    },
    {
      name: "sendTransaction",
      inputs: [
        {name: "dest", type: "address"},
        {name: "value", type: "uint128"},
        {name: "bounce", type: "bool"},
        {name: "flags", type: "uint8"},
        {name: "payload", type: "cell"},
      ],
      outputs: [],
    },
    {
      name: "submitTransaction",
      inputs: [
        {name: "dest", type: "address"},
        {name: "value", type: "uint128"},
        {name: "bounce", type: "bool"},
        {name: "allBalance", type: "bool"},
        {name: "payload", type: "cell"},
      ],
      outputs: [{name: "transId", type: "uint64"}],
    },
    {
      name: "confirmTransaction",
      inputs: [{name: "transactionId", type: "uint64"}],
      outputs: [],
    },
    {
      name: "isConfirmed",
      inputs: [
        {name: "mask", type: "uint32"},
        {name: "index", type: "uint8"},
      ],
      outputs: [{name: "confirmed", type: "bool"}],
    },
    {
      name: "getParameters",
      inputs: [],
      outputs: [
        {name: "maxQueuedTransactions", type: "uint8"},
        {name: "maxCustodianCount", type: "uint8"},
        {name: "expirationTime", type: "uint64"},
        {name: "minValue", type: "uint128"},
        {name: "requiredTxnConfirms", type: "uint8"},
        {name: "requiredUpdConfirms", type: "uint8"},
      ],
    },
    {
      name: "getTransaction",
      inputs: [{name: "transactionId", type: "uint64"}],
      outputs: [
        {
          components: [
            {name: "id", type: "uint64"},
            {name: "confirmationsMask", type: "uint32"},
            {name: "signsRequired", type: "uint8"},
            {name: "signsReceived", type: "uint8"},
            {name: "creator", type: "uint256"},
            {name: "index", type: "uint8"},
            {name: "dest", type: "address"},
            {name: "value", type: "uint128"},
            {name: "sendFlags", type: "uint16"},
            {name: "payload", type: "cell"},
            {name: "bounce", type: "bool"},
          ],
          name: "trans",
          type: "tuple",
        },
      ],
    },
    {
      name: "getTransactions",
      inputs: [],
      outputs: [
        {
          components: [
            {name: "id", type: "uint64"},
            {name: "confirmationsMask", type: "uint32"},
            {name: "signsRequired", type: "uint8"},
            {name: "signsReceived", type: "uint8"},
            {name: "creator", type: "uint256"},
            {name: "index", type: "uint8"},
            {name: "dest", type: "address"},
            {name: "value", type: "uint128"},
            {name: "sendFlags", type: "uint16"},
            {name: "payload", type: "cell"},
            {name: "bounce", type: "bool"},
          ],
          name: "transactions",
          type: "tuple[]",
        },
      ],
    },
    {
      name: "getTransactionIds",
      inputs: [],
      outputs: [{name: "ids", type: "uint64[]"}],
    },
    {
      name: "getCustodians",
      inputs: [],
      outputs: [
        {
          components: [
            {name: "index", type: "uint8"},
            {name: "pubkey", type: "uint256"},
          ],
          name: "custodians",
          type: "tuple[]",
        },
      ],
    },
    {
      name: "submitUpdate",
      inputs: [
        {name: "codeHash", type: "uint256"},
        {name: "owners", type: "uint256[]"},
        {name: "reqConfirms", type: "uint8"},
      ],
      outputs: [{name: "updateId", type: "uint64"}],
    },
    {
      name: "confirmUpdate",
      inputs: [{name: "updateId", type: "uint64"}],
      outputs: [],
    },
    {
      name: "executeUpdate",
      inputs: [
        {name: "updateId", type: "uint64"},
        {name: "code", type: "cell"},
      ],
      outputs: [],
    },
    {
      name: "getUpdateRequests",
      inputs: [],
      outputs: [
        {
          components: [
            {name: "id", type: "uint64"},
            {name: "index", type: "uint8"},
            {name: "signs", type: "uint8"},
            {name: "confirmationsMask", type: "uint32"},
            {name: "creator", type: "uint256"},
            {name: "codeHash", type: "uint256"},
            {name: "custodians", type: "uint256[]"},
            {name: "reqConfirms", type: "uint8"},
          ],
          name: "updates",
          type: "tuple[]",
        },
      ],
    },
  ],
  data: [],
  events: [
    {
      name: "TransferAccepted",
      inputs: [{name: "payload", type: "bytes"}],
      outputs: [],
    },
  ],
} as const;
