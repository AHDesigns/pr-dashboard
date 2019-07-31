import React from 'react';
import { prData, pullRequest } from './types';
import Pr from './Pr';

const Repo: React.FC<{ prs: prData }> = ({ prs }) => {

  return (
    <div className="repo">
      <p className="repo-title">NAME: {prs.name}</p>
      <ul>
        {prs.pullRequests.length > 0 &&
          prs.pullRequests
            .filter((pr: pullRequest) => !pr.isDraft) // TODO: will likely do something with this later
            .map((pr: pullRequest) => <li key={pr.title} className="repo-item">
              <Pr {...pr} />
            </li>)}
      </ul>
    </div>
  );
}
export default Repo;
