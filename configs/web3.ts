// Module dependencies
import Web3 from "web3";

// Assets
import { wording, fallbackUrl } from "../utils/constants";


/**
 * Detect the Ethereum provider and create a web3 instance.
 * @returns A web3 instance with the network provider.
 */
const getWeb3 = (): Promise<Web3> => new Promise(
  async (resolve, reject) => {
    // Modern dapp browsers
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }

    // Legacy dapp browsers
    else if (window.web3) {
      const web3 = window.web3;
      resolve(web3);
    }

    // Fallback to localhost; use dev console port by default
    else {
      const provider = new Web3.providers.HttpProvider(fallbackUrl);
      const web3 = new Web3(provider);

      console.log(wording.NO_WEB3_INSTANCE);

      resolve(web3);
    }
  });

export default getWeb3;
