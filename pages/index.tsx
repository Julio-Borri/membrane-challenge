// Module dependencies
import { useContext, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import path from 'path';
import fs from 'fs/promises';
import {SurveyInterface } from '../state/interfaces';
import { AppContext } from '../state/reducers';
import actionDispatcher from '../state/action-dipatchers';

// UI Components
import Head from 'next/head';
import NetworkManager from '../components/network-manager';
import SurveyManager from '../components/survey-manager';

// Assets
import { wording } from '../utils/constants';


interface HomeProps {
  availableTrivias: Array<SurveyInterface>;
}

const Home: NextPage<HomeProps> = ({ availableTrivias }) => {
  const { state, dispatch } = useContext(AppContext);
  const actions = actionDispatcher(state, dispatch);

  const { PAGE_TITLE, PAGE_SUBTITLE } = wording;

  useEffect(() => {
    actions.setAvailableTrivias(availableTrivias);
  }, [])
  
  return (
    <div>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name={PAGE_TITLE} content={PAGE_SUBTITLE} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NetworkManager />
      <SurveyManager />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const filePath = path.join(process.cwd(), 'utils', 'mock-survey.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return {
    props: {
      availableTrivias: data,
    }
  };
}

export default Home;
