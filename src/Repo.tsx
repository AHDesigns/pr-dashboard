import React, { useEffect, useState } from 'react';
import { prData, pullRequest } from './types';
import { getPullRequests } from './utils/fetchWrappers';
import Pr from './Pr';

const Repo: React.FC<{ repo: string }> = ({ repo }) => {
  const defaultReviews: prData = { name: repo, pullRequests: [] }
  const [prs, setPrs] = useState(defaultReviews);

  const body = {
    name: repo,
    owner: 'sky-uk',
    prCount: 26,
    reviewsCount: 10,
  };

  useEffect(() => getPullRequests(body, setPrs), [repo])

  return (
    <div className="">
      <p>NAME: {repo}</p>
      <ul>
        {prs.pullRequests.length > 0 && prs.pullRequests.map((pr: pullRequest) => <Pr {...pr} />)}
      </ul>
    </div>
  );
}
export default Repo;
