import { constants } from '../constants';
import { prData, isPrData, PrDataRequest, isPrDataRequest } from '../types'

export function getPullRequests(repoData: PrDataRequest, storePullRequests: (data: prData) => void) {
    fetch(`${constants.baseURL}/reviews`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(repoData)
    })
        .then(res => {
            res
                .json()
                .then((data) => {
                    if (isPrData(data)) {
                        storePullRequests(data)
                    } else {
                        console.warn('reviews.request.not.of.type.prData', data);
                    }
                })
                .catch(e => console.error('json error', e));
        })
        .catch(e => console.error('fetch error', e));
}

export function getRepos(storeRepos: (data: PrDataRequest[]) => void) {
    fetch(`${constants.baseURL}/repos`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    })
        .then(res => {
            res
                .json()
                .then((data: PrDataRequest[]) => {
                    if (data.every(isPrDataRequest)) {
                        storeRepos(data)
                    } else {
                        console.warn('repos.request.not.of.type.Repos', data);
                    }
                })
                .catch(e => console.error('json error', e));
        })
        .catch(e => console.error('fetch error', e));
}

export function putRepos(repos: PrDataRequest[], storeRepos: (data: PrDataRequest[]) => void) {
    fetch(`${constants.baseURL}/repos`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(repos)
    })
        .then(res => {
            res
                .json()
                .then((data: PrDataRequest[]) => {
                    if (data.every(isPrDataRequest)) {
                        storeRepos(data)
                    } else {
                        console.warn('repos.request.not.of.type.Repos', data);
                    }
                })
                .catch(e => console.error('json error', e));
        })
        .catch(e => console.error('fetch error', e));
}
