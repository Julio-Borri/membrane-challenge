export enum NetworkStates {
  UNCONNECTED = 'unconnected',
  CONNECTED = 'connected',
}

export enum TriviaStates {
  UNSTARTED = 'unstarted',
  ONGOING = 'ongoing',
  TOSUBMIT = 'tosubmit',
  FINISHED = 'finished',
}

export interface AppState {
  web3: any;
  accounts: any;
  contract: any;
  currentChain: string;
  networkState: NetworkStates;
  quizTokenBalance: string;
  availableTrivias: Array<SurveyInterface>;
  activeTrivia: SurveyInterface;
  triviaState: TriviaStates;
}

interface SurveyQuestionOptions {
  text: string;
}

export interface SurveyQuestion {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: Array<SurveyQuestionOptions>
}

export interface SurveyInterface {
  id: number;
  title: string;
  image: string;
  questions: Array<SurveyQuestion>;
}
