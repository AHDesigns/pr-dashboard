import React, { useEffect, useState } from 'react';
import { IPrInfo } from '../types';
import { getRepos, putRepos } from '../utils/fetchWrappers';

type decoratedPrInfo = IPrInfo & {
    selected: boolean;
};

const initialAvailableRepos: decoratedPrInfo[] = [];

export const RepoInfo: React.FC<{
    subscribedRepos: string[];
    setSubscribedRepos: (data: string[]) => void;
}> = ({ setSubscribedRepos, subscribedRepos }) => {
    const [availableRepos, setAvailableRepos] = useState(initialAvailableRepos);

    useEffect(() => {
        getRepos()
            .then(availableReposFromServer => {
                const decoratedPrs: decoratedPrInfo[] = availableReposFromServer.map(repo => ({
                    ...repo,
                    selected: subscribedRepos.includes(repo.name),
                }));
                setAvailableRepos(decoratedPrs);
            })
            .catch();
    }, []);

    const newRepo: IPrInfo = {
        name: '',
        owner: '',
        prCount: 1,
        reviewsCount: 1,
    };

    return (
        <>
            {availableRepos.map(repo => (
                <div key={repo.name}>
                    <input checked={repo.selected} type="checkbox" value={repo.name} onChange={subscribeToRepo} />
                    <p>
                        {repo.name}: {repo.owner}
                    </p>
                </div>
            ))}
            <button
                onClick={() => {
                    putRepos([newRepo]);
                }}
            >
                Add Repo
            </button>
            <button
                onClick={() => {
                    // TODO: dry
                    getRepos()
                        .then(availableReposFromServer => {
                            const decoratedPrs: decoratedPrInfo[] = availableReposFromServer.map(repo => ({
                                ...repo,
                                selected: subscribedRepos.includes(repo.name),
                            }));
                            setAvailableRepos(decoratedPrs);
                        })
                        .catch();
                }}
            >
                Refresh RepoInfo
            </button>
        </>
    );

    function subscribeToRepo(e: React.ChangeEvent<HTMLInputElement>): void {
        const { value, checked } = e.currentTarget;
        const repos = availableRepos.map(repo => ({
            ...repo,
            selected: repo.name === value ? checked : repo.selected,
        }));

        setAvailableRepos(repos);
        const selectedRepos = repos.filter(repo => repo.selected).map(repo => repo.name);

        setSubscribedRepos(selectedRepos);
        window.localStorage.setItem('subscribedRepos', JSON.stringify(selectedRepos));
    }
};
