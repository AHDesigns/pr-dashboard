import React from 'react';
import { IPrData, IPullRequest, TRepoUserFilters } from '../types';
import Pr from './Pr';

const filteredUsers = (repoUserFilters: TRepoUserFilters) => {
    const users = repoUserFilters.all.users.map(u => u.login);
    const { whitelist } = repoUserFilters.all;

    return (user: string): boolean => {
        return whitelist ? users.includes(user) : !users.includes(user);
    };
};

const Repo: React.FC<{ reposData: IPrData; repoUserFilters: TRepoUserFilters }> = ({ reposData, repoUserFilters }) => {
    const validUser = filteredUsers(repoUserFilters);
    return (
        <div className="repo">
            <p className="repo-title">
                {reposData.name} [{reposData.pullRequests.length}]
            </p>
            <ul>
                {reposData.pullRequests.length > 0 &&
                    reposData.pullRequests
                        .filter((pr: IPullRequest) => !pr.isDraft && pr.author && validUser(pr.author.login))
                        .map((pr: IPullRequest) => (
                            <li key={pr.id} className="repo-item">
                                <Pr {...pr} />
                            </li>
                        ))}
            </ul>
        </div>
    );
};
export default Repo;
