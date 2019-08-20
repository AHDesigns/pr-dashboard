import React, { useEffect, useState } from 'react';
import { IPrInfo } from '../types';
import { getRepos, putRepos } from '../utils/fetchWrappers';

type decoratedPrInfo = IPrInfo & {
    selected: boolean;
};

const RepoForm: React.FC<{ updateRepos: () => void }> = ({ updateRepos }) => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [prCount, setPrCount] = useState(1);
    const [reviewsCount, setReviewsCount] = useState(1);

    const newRepo: IPrInfo = { name, owner, prCount, reviewsCount };
    return (
        <form
            onSubmit={(e): void => {
                e.preventDefault();
                // TODO put in some form validation
                putRepos([newRepo], updateRepos);
                // reset form
                setName('');
                setOwner('');
                setPrCount(1);
                setReviewsCount(1);
            }}
        >
            <label>
                Repo:
                <input
                    type="text"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
            </label>
            <label>
                Owner:
                <input
                    type="text"
                    value={owner}
                    onChange={e => {
                        setOwner(e.target.value);
                    }}
                />
            </label>
            <label>
                Pr Count:
                <input
                    type="number"
                    value={prCount}
                    onChange={e => {
                        setPrCount(parseInt(e.target.value));
                    }}
                />
            </label>
            <label>
                Reviews Count:
                <input
                    type="number"
                    value={reviewsCount}
                    onChange={e => {
                        setReviewsCount(parseInt(e.target.value));
                    }}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

const initialAvailableRepos: decoratedPrInfo[] = [];

export const RepoInfo: React.FC<{
    subscribedRepos: string[];
    setSubscribedRepos: (data: string[]) => void;
}> = ({ setSubscribedRepos, subscribedRepos }) => {
    const [availableRepos, setAvailableRepos] = useState(initialAvailableRepos);

    useEffect(() => updateRepos(), []);

    const [showMenu, toggleMenu] = useState(false);

    return (
        <div className="repo-selector">
            <div className="repo-selector__menu">
                <button onClick={(): void => toggleMenu(!showMenu)}>{showMenu ? 'close' : 'menu'}</button>
            </div>
            <div className="repo-selector__view" style={{ display: showMenu ? 'block' : 'none' }}>
                <h2>Subscribe to Repos:</h2>
                <ul>
                    {availableRepos.map(repo => (
                        <li key={repo.name}>
                            <input
                                checked={repo.selected}
                                type="checkbox"
                                value={repo.name}
                                onChange={subscribeToRepo}
                            />
                            <p>{repo.name}</p>
                        </li>
                    ))}
                </ul>
                <button onClick={(): void => updateRepos()}>Refresh RepoInfo</button>
                <h2>Add Repo:</h2>
                <RepoForm updateRepos={updateRepos} />
            </div>
        </div>
    );

    function updateRepos(): void {
        getRepos()
            .then(availableReposFromServer => {
                const decoratedPrs: decoratedPrInfo[] = availableReposFromServer.map(repo => ({
                    ...repo,
                    selected: subscribedRepos.includes(repo.name),
                }));
                setAvailableRepos(decoratedPrs);
            })
            .catch();
    }

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
