// General wording
const wording: { [key: string]: string } = {
  PAGE_TITLE: 'Membrane FE Challenge', 
  PAGE_SUBTITLE: 'FE Challenge fro RatherLabs',

  // Network Manager
  METAMASK_CARD_TITLE: 'Metamask',
  NETWORK_CARD_TITLE: 'Network',
  TOKEN_CARD_TITLE: 'Quiz Token Balance',
  CONNECTED_TO_NETWORK: 'Already connected to Network:',
  CONNECT_METAMASK_LABEL: 'Connect to Metamask',
  CONNECT_ROPSTEN_LABEL: 'Connect to Ropsten',
  UPDATE_TOKENS_LABEL: 'Update',
  ALREADY_CONNECTED: 'Conected',
  ROPSTEN_CONNECTED: 'Conected to Ropsten',

  // Survey
  AVAILABLE_SURVEYS: 'Available surveys',
  COMPLETE_CONNECTION: 'Please connect to Metamask and Ropsten Network',
  START_SURVEY: 'Click to start Survey',

  WEB3_ERROR: 'Some error occurs. Check console for details.'
};


const contractAddress: string = '0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03';

const ropstenChainId: string = '0x3';

export {
  wording,
  contractAddress,
  ropstenChainId
};
