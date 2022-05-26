interface Window {
  ethereum: any,
  web3: any,
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
