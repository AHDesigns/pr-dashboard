import React, { useEffect, useState } from 'react';
import { getPrHistory } from '../utils/fetchWrappers';
import { TPrHistory } from '../types';

const initialPrHistory: TPrHistory = { name: 'skyport-graphql' };

export const PrHistory: React.FC = () => {
    const [prHistory, setPrHistory] = useState(initialPrHistory);
    useEffect(() => {
        getPrHistory()
            .then(setPrHistory)
            .catch(console.log);
    }, []);

    return (
        <div>
            <p>{prHistory.name}</p>
            <ul>
                {prHistory.prs &&
                    prHistory.prs.map(pr => (
                        <li key={pr.id}>
                            {pr.author.login} |
                            {new Date(pr.createdAt).toLocaleString('en-uk', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
