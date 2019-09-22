import React from 'react';
import { IPrData, IPullRequest, TRepoUserFilters } from '../types';
import Pr from './Pr';

const Repo: React.FC<{ reposData: IPrData; repoUserFilters: TRepoUserFilters }> = ({ reposData, repoUserFilters }) => {
    return (
        <div className="repo">
            <p className="repo-title">
                {reposData.name} [{reposData.pullRequests.length}]
            </p>
            <ul>
                {reposData.pullRequests.length > 0 &&
                    reposData.pullRequests
                        .filter(
                            (pr: IPullRequest) =>
                                !pr.isDraft &&
                                pr.author &&
                                repoUserFilters.all.users.map(u => u.login).includes(pr.author.login),
                        ) // TODO: will likely do something with this later
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
