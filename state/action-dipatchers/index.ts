// Module dependencies
import { Dispatch } from "react";
import { Actions } from "../actions";
import { ActionTypes } from "../action-types";
import getWeb3 from '../../configs/web3';

// Assets
import { AppState, SurveyInterface } from '../interfaces';
import { contractAddress, wording } from '../../utils/constants';
import { QuizTokenABI } from '../../contracts/QuizTokenABI';

/**
 * Responsible to dispatch actions to keep the status update.
 * @param state App global state.
 * @param dispatch Action disptahcer.
 * @returns Set of function to dipatch actions.
 */
const actionDispatcher = (
  state: AppState,
  dispatch: Dispatch<Actions>
) => {
  const { WEB3_ERROR } = wording;

  /**
   * Handle error and update global state.
   * @param error Error.
   */
  const handleError = (error: ProviderRpcError): void => {
    dispatch({
      type: ActionTypes.SET_ERROR,
      payload: error.message,
    });
  }

  /**
   * Detect the current network chain Id and save it in context.
   */
  const handleNetworkChange = async (): Promise<void> => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    dispatch({
      type: ActionTypes.SET_CURRENT_CHAIN,
      payload: chainId,
    });
  };

  /**
   * Connect the logged metamask account to the current site.
   */
  const handleConnect = async (): Promise<void> => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      if (window.ethereum)
        window.ethereum.on('chainChanged', handleNetworkChange);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      // Get the contract instance.
      const instance = new web3.eth.Contract(
        QuizTokenABI,
        contractAddress
      );

      // Set web3, accounts, and contract to the state
      dispatch({
        type: ActionTypes.SET_CONTRACT_DATA,
        payload: {
          currentChain: `0x${networkId}`,
          web3,
          accounts,
          contract: instance,
        }
      });

    } catch (error: any) {
      handleError(error);
    }
  };

  /**
   * Switch the connection to the ethereum target chain.
   * @param chainId Id for the network to change to.
   */
  const handleChangeNetwork = async (chainId: string): Promise<void> => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (error: any) {
      handleError(error);
    }
  };

  /**
   * Fecth the amount of Token for the current address and save in context.
   */
  const getQuizTokenBalance = async (): Promise<void> => {
    const { accounts, contract } = state;

    try {
      const balance = await contract.methods
        .balanceOf(accounts[0])
        .call();

      dispatch({
        type: ActionTypes.SET_QUIZ_TOKEN_BALANCE,
        payload: balance,
      });
    } catch (error: any) {
      handleError(error);
    }
  };

  /**
   * Save available trivias in context.
   * @param data List os available trivias.
   */
  const setAvailableTrivias = (data: Array<SurveyInterface>): void => {
    dispatch({
      type: ActionTypes.SET_AVAILABLE_TRIVIAS,
      payload: data,
    });
  };

  /**
   * Update the trivia state and save the active in context.
   * @param triviaId Trivia Id.
   */
  const initializeTrivia = (triviaId: number): void => {
    const { availableTrivias } = state;

    dispatch({
      type: ActionTypes.INITIALIZE_TRIVIA,
      payload: availableTrivias.find(({ id }) => id === triviaId)
    });
  };

  /**
   * Save user answers in context.
   * @param answers Object with the anwsers.
   */
  const setTriviaAnswers = (answers: {[key: string]: number}) => {
    if (Object.keys(answers).length === 0) {
      dispatch({
        type: ActionTypes.FINISH_SUBMIT
      });
    } else {
      dispatch({
        type: ActionTypes.SET_TRIVIA_ANSWERS,
        payload: answers
      });
    }

  };

  /**
   * Submit users answers to the contract.
   * @param formValues Values selected by the user.
   */
  const submitSurvey = async (
    formValues: {[key: string]: number}
  ): Promise<void> => {
    const { accounts, contract, activeTrivia } = state;

    dispatch({
      type: ActionTypes.SUBMIT_TRIVIA,
    });

    try {
      await contract.methods
        .submit(activeTrivia.id, Object.values(formValues))
        .send({ from: accounts[0] });
    } catch (error: any) {
      handleError(error);
    } finally {
      dispatch({
        type: ActionTypes.FINISH_SUBMIT
      });

      getQuizTokenBalance();
    }
  };

  /**
   * Dismiss the error. Close the alert and clean the error state.
   */
  const handleDismissError = () => {
    dispatch({
      type: ActionTypes.DISMISS_ERROR,
    });
  }

  return {
    handleConnect,
    handleChangeNetwork,
    getQuizTokenBalance,
    setAvailableTrivias,
    initializeTrivia,
    setTriviaAnswers,
    submitSurvey,
    handleDismissError,
  };
};

export default actionDispatcher;
