import React, { useEffect, useState } from 'react';
import { IPrDataRequest } from '../types';
import { getRepos, putRepos } from '../utils/fetchWrappers';

const initialAvailableRepos: IPrDataRequest[] = [];
export const RepoInfo: React.FC<{
    subscribedRepos: string[];
    setSubscribedRepos: (data: string[]) => void;
}> = ({ setSubscribedRepos, subscribedRepos }) => {
    const [availableRepos, setAvailableRepos] = useState(initialAvailableRepos);
    useEffect(() => getRepos(setAvailableRepos), []);

    const newRepo: IPrDataRequest = {
        name: '',
        owner: '',
        prCount: 1,
        reviewsCount: 1,
    };

    return (
        <>
            {availableRepos.map(repo => (
                <div key={repo.name}>
                    <input type="checkbox" value={repo.name} onClick={subscribeToRepo} />
                    <p>
                        {repo.name}: {repo.owner}
                    </p>
                </div>
            ))}
            <button
                onClick={() => {
                    putRepos([newRepo], setAvailableRepos);
                }}
            >
                Add Repo
            </button>
            <button
                onClick={() => {
                    getRepos(setAvailableRepos);
                }}
            >
                Refresh RepoInfo
            </button>
        </>
    );

    function subscribeToRepo(e: React.MouseEvent<HTMLInputElement>): void {
        const { value, checked } = e.currentTarget;
        if (checked) {
            const repos = dedupeA(subscribedRepos.concat(e.currentTarget.value));
            window.localStorage.setItem('subscribedRepos', JSON.stringify(repos));
            setSubscribedRepos(repos);
        } else {
            setSubscribedRepos(dedupeA(subscribedRepos).filter(repo => repo !== value));
        }
    }
};

function dedupeA<T>(arr: T[]): T[] {
    return arr.reduce(dedupe, []);

    function dedupe<TT>(all: TT[], cur: any): TT[] {
        if (all.includes(cur)) {
            return all;
        }
        return all.concat(cur);
    }
}
