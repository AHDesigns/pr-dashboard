import { constants } from '../constants';
import { IPrInfo, isPrInfo } from '../types';

export function getRepos(): Promise<IPrInfo[]> {
    return new Promise((resolve, reject) => {
        fetch(`${constants.baseURL}/repos`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        })
            .then(res => {
                res.json()
                    .then((data: IPrInfo[]) => {
                        if (data.every(isPrInfo)) {
                            resolve(data);
                        } else {
                            console.warn('repos.request.not.of.type.Repos', data);
                            reject();
                        }
                    })
                    .catch(e => {
                        console.error('json error', e);
                        reject();
                    });
            })
            .catch(e => {
                console.error('fetch error', e);
                reject();
            });
    });
}

export function putRepos(repos: IPrInfo[]): void {
    fetch(`${constants.baseURL}/repos`, {
        body: JSON.stringify(repos),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
    })
        .then(res => {
            res.json()
                .then((data: IPrInfo[]) => {
                    if (data.every(isPrInfo)) {
                        /* storeRepos(data); */
                        // TODO dry
                        console.log('yay')
                    } else {
                        console.warn('repos.request.not.of.type.Repos', data);
                    }
                })
                .catch(e => console.error('json error', e));
        })
        .catch(e => console.error('fetch error', e));
}
