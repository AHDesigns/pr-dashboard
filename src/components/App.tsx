import React, { useState } from 'react';
import './App.scss';
import { IPrData } from '../types';
import { Provider } from './Socket';
import { RepoInfo } from './RepoSelector';
import Repo from './Repo';

const initialSubscribedRepos: string[] = JSON.parse(window.localStorage.getItem('subscribedRepos') || '[]');

const App: React.FC = () => {
    const [subscribedRepos, setSubscribedRepos] = useState(initialSubscribedRepos);

    return (
        <div className="App">
            <RepoInfo subscribedRepos={subscribedRepos} setSubscribedRepos={setSubscribedRepos} />
            <Provider subscribedRepos={subscribedRepos}>
                {(reposData: IPrData[]) => reposData.map(data => <Repo key={data.name} reposData={data} />)}
            </Provider>
        </div>
    );
};

export default App;
