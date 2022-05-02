import { Environment, RPCNode } from './types';

export const rpcNodes: { [key in Environment]: RPCNode[] } = {
  MAINNET: [
    {name:'ECAD Labs', url:'https://mainnet.api.tez.ie'},
    {name:'Tezos Foundation', url:'https://rpc.tzbeta.net/'},
    {name:'SmartPy', url:'https://mainnet.smartpy.io'},
    {name:'Giga Node', url:'https://mainnet-tezos.giganode.io'}
  ],
  TESTNET: [
    {name:'SmartPy', url:'https://granadanet.smartpy.io/'},
    {name:'ECAD Labs', url:'https://granadanet.api.tez.ie'}
  ]
};