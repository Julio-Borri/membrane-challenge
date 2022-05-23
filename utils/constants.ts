// General wording
const wording: { [key: string]: string } = {
  PAGE_TITLE: 'Membrane', 
  PAGE_SUBTITLE: 'FrontEnd Challenge',

  METAMASK_CARD_TITLE: 'Metamask',
  NETWORK_CARD_TITLE: 'Network',
  CONNECTED_TO_NETWORK: 'Already connected to Network:',
  CONNECT_METAMASK_LABEL: 'Connect to Metamask',
  CONNECT_ROPSTEN_LABEL: 'Connect to Ropsten',
  ALREADY_CONNECTED: 'Conected',
  ROPSTEN_CONNECTED: 'Conected to Ropsten',

  WEB3_ERROR: 'Some error occurs. Check console for details.'
};


const contractAddress: string = '0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03';

const ropstenChainId: string = '0x3';

export {
  wording,
  contractAddress,
  ropstenChainId
};
