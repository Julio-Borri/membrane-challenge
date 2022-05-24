export enum NetworkSates {
  UNCONNECTED = 'unconnected',
  CONNECTED = 'connected',
}

export interface AppState {
  web3: any;
  accounts: any;
  contract: any;
  currentChain: string;
  networkState: NetworkSates;
  quizTokenBalance: string;
  dailyTrivia: Survey;
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

export interface Survey {
  title: string;
  image: string;
  questions: Array<SurveyQuestion>;
}