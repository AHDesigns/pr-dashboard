import { constants } from '../constants';
import { prDataRequest, prData, isPrData } from '../types'

export function getPullRequests(repoData: prDataRequest, storePullRequests: (data: prData) => void) {
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
