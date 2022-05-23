export enum NetworkSates {
  UNCONNECTED = 'unconnected',
  CONNECTED = 'connected',
}

export interface AppState {
  web3: any;
  accounts: any;
  contract: any;
  currentChain: string;
  networkState?: NetworkSates;
}
