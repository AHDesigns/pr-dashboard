import React, { useEffect, useState } from 'react';
import './App.css';
import Repo from './Repo';
import openSocket from 'socket.io-client';
import { constants } from './constants';
import { prData, isPrData, PrDataRequest } from './types';
import {getRepos, putRepos} from './utils/fetchWrappers';

function applyState (fn: React.Dispatch<React.SetStateAction<prData>>, fallback: prData) {
    return function (data: prData): void {
        if(isPrData(data)) {
            fn(data);
        } else {
            console.error('not prData', data)
            fn(fallback)
        }
    }
}

let socket: any;

const Provider: React.FC<{
    children: (prs: prData) => any,
    initialPrs: prData,
    subscribedRepos: PrDataRequest[]
}> = ({ children, initialPrs, subscribedRepos }) => {
        const [prs, setPrs] = useState(initialPrs);

        useEffect(() => {
            socket = openSocket(constants.baseURL, { hostname: 'cheese' });
            socket.on('reviews', applyState(setPrs, initialPrs));
        }, [initialPrs])

        useEffect(() => {
            console.log(subscribedRepos)
            socket.emit('reviews', subscribedRepos);
        }, [subscribedRepos])


        if (children) {
            return (children(prs))
        }
    };

const Repos: React.FC<{ repos: PrDataRequest[], setRepos: (data: PrDataRequest[]) => void }> = ({ repos, setRepos }) => {
    const newRepo: PrDataRequest = {
        name: '',
        owner: '',
        prCount: 1,
        reviewsCount: 1
    };
    function subscribeToRepo(e: React.MouseEvent<HTMLInputElement>) {
        console.log(e.currentTarget.value)
        console.log(e.currentTarget.checked)
    }

    return (
        <>
            {repos.map(repo => (
                <div>
                    <input type="checkbox" value={repo.name} onClick={subscribeToRepo} />
                    <p>
                        {repo.name}: {repo.owner}
                    </p>
                </div>
            ))}
            <button onClick={() => { putRepos([newRepo], setRepos); }}>Add Repo</button>
        </>
    )
}

const initialPrs: prData = { name: 'loading', pullRequests: [] }
const initialRepos: PrDataRequest[] = [];

const App: React.FC = () => {
    const [repos, setRepos] = useState(initialRepos);

    useEffect(() => getRepos(setRepos), [])

    return (
        <div className="App">
            <Repos repos={repos} setRepos={setRepos} />
            <Provider initialPrs={initialPrs} subscribedRepos={[repos[0]]}>
                {(prs: prData) => (
                    <Repo prs={prs} />
                )}
            </Provider>
        </div>
    );
}

export default App;

