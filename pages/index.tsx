// Module dependencies
import { useContext, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { Survey } from '../state/interfaces';
import { AppContext } from '../state/reducers';
import actionDispatcher from '../state/action-dipatchers';

// UI Components
import Head from 'next/head';
import NetworkManager from '../components/network-manager';

// Assets
import { wording } from '../utils/constants';


interface HomeProps {
  dailySurvey: Survey;
}

const Home: NextPage<HomeProps> = ({ dailySurvey }) => {
  const { state, dispatch } = useContext(AppContext);
  const actions = actionDispatcher(state, dispatch);

  const { PAGE_TITLE, PAGE_SUBTITLE } = wording;

  useEffect(() => {
    actions.setDailyTrivia(dailySurvey);
  }, [])
  
  return (
    <div>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name={PAGE_TITLE} content={PAGE_SUBTITLE} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NetworkManager />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const filePath = path.join(process.cwd(), 'utils', 'mock-survey.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return {
    props: {
      dailySurvey: data,
    }
  };
}

export default Home;
