import React, { useEffect, useState } from "react";
import { IPrDataRequest } from "../types";
import { getRepos, putRepos } from "../utils/fetchWrappers";

const initialAvailableRepos: IPrDataRequest[] = [];
export const RepoInfo: React.FC<{
    subscribedRepos: string[],
    setSubscribedRepos: (data: string[]) => void,
}> = ({ setSubscribedRepos, subscribedRepos }) => {
    useEffect(() => getRepos(setAvailableRepos), []);
    const [availableRepos, setAvailableRepos] = useState(initialAvailableRepos);

    const newRepo: IPrDataRequest = {
        name: "",
        owner: "",
        prCount: 1,
        reviewsCount: 1,
    };

    return (
        <>
            {availableRepos.map((repo) => (
                <div>
                    <input type="checkbox" value={repo.name} onClick={subscribeToRepo} />
                    <p>
                        {repo.name}: {repo.owner}
                    </p>
                </div>
            ))}
            <button onClick={() => { putRepos([newRepo], setAvailableRepos); }}>Add Repo</button>
            <button onClick={() => { getRepos(setAvailableRepos); }}>Refresh RepoInfo</button>
        </>
    );

    function subscribeToRepo(e: React.MouseEvent<HTMLInputElement>) {
        const { value, checked } = e.currentTarget;
        if (checked) {
            setSubscribedRepos(dedupeA(subscribedRepos.concat(e.currentTarget.value)));
        } else {
            setSubscribedRepos(dedupeA(subscribedRepos).filter((repo) => repo !== value));
        }
    }

};

function dedupeA<T>(arr: T[]): T[] {
    return arr.reduce(dedupe, []);

    function dedupe<TT>(all: TT[], cur: any): TT[] { if (all.includes(cur)) { return all; } return all.concat(cur); }
}
