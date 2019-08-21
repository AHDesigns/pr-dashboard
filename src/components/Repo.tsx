import React from 'react';
import { IPrData, IPullRequest } from '../types';
import Pr from './Pr';

const Repo: React.FC<{ reposData: IPrData }> = ({ reposData }) => {
    return (
        <div className="repo">
            <p className="repo-title">{reposData.name}</p>
            <ul>
                {reposData.pullRequests.length > 0 &&
                    reposData.pullRequests
                        .filter((pr: IPullRequest) => !pr.isDraft) // TODO: will likely do something with this later
                        .map((pr: IPullRequest) => (
                            <li key={pr.title} className="repo-item">
                                <Pr {...pr} />
                            </li>
                        ))}
            </ul>
        </div>
    );
};
export default Repo;
