export enum reviewStates {
    PENDING,
    COMMENTED,
    APPROVED,
    CHANGES_REQUESTED,
    DISMISSED,
};

export type PrDataRequest = {
    name: string,
    owner: string,
    prCount: number,
    reviewsCount: number,
}

export function isPrDataRequest(data: any): data is PrDataRequest {
    return typeof data === 'object'
        && typeof data.name === 'string'
        && typeof data.owner === 'string'
        && typeof data.prCount === 'number'
        && typeof data.reviewsCount === 'number'
}


export type prData = {
  name: string,
  pullRequests: pullRequest[],
}

// seems a bit flakey
export function isPrData(data: any): data is prData {
    return typeof data === 'object'
        && typeof data.name === 'string'
        && Array.isArray(data.pullRequests);
}

export type pullRequest = {
    isDraft: boolean,
    isFailing: boolean,
    title: string,
    url: string,
    author?: {
        login: string,
        avatarUrl: string,
    },
    reviews: {
        state: reviewStates,
        uniqueReviews: uniqueReview[],
    }
}

// export function isPullRequest(arr: undefined[] | pullRequest[]): arr is pullRequest[] {
//   const first = arr[0];
//     if (first && first.title && first.author) {
//         return true
//     }
//   return false
// }
// TODO: learn better way for this
// https://github.com/Microsoft/TypeScript/issues/10272#issuecomment-249404179
// function isNotEmpty<T>(arr: T[]): arr is Array<T> & { pop(): T; } {
// function isNotEmpty<T>(arr: T[]): arr is { pop(): T; } & Array<T> {
//   return arr.length > 0;
// }

export type uniqueReview = {
    state: reviewStates,
    url: string,
    author: {
        login: string,
        avatarUrl: string,
    },
    onBehalfOf?: {
        login: string,
        avatarUrl: string,
    },
}
