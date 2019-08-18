/*
 * The details relating to a github repo that will be used
 * by the server to fetch reviews.
 */
export type IPrInfo = {
    name: string;
    owner: string;
    prCount: number;
    reviewsCount: number;
};

export function isPrInfo(data: any): data is IPrInfo {
    return (
        typeof data === 'object' &&
        typeof data.name === 'string' &&
        typeof data.owner === 'string' &&
        typeof data.prCount === 'number' &&
        typeof data.reviewsCount === 'number'
    );
}

export interface IPrData {
    name: string;
    pullRequests: IPullRequest[];
}

export function isPrData(data: any): data is IPrData {
    return typeof data === 'object' && typeof data.name === 'string' && Array.isArray(data.pullRequests);
}

export interface IPullRequest {
    isDraft: boolean;
    mergeStateStatus: string;
    mergeable: string;
    title: string;
    url: string;
    author?: {
        login: string;
        avatarUrl: string;
    };
    reviews: {
        state: reviewStates;
        uniqueReviews: IUniqueReview[];
    };
    statuses: {
        commitUrl: string;
        message: string;
        status: {
            contexts: {
                description: string;
                avatarUrl: string;
                state: StatusState;
            };
            state: StatusState;
        };
    };
}

export enum reviewStates {
    PENDING,
    COMMENTED,
    APPROVED,
    CHANGES_REQUESTED,
    DISMISSED,
}

export interface IUniqueReview {
    state: reviewStates;
    url: string;
    author: {
        login: string;
        avatarUrl: string;
    };
    onBehalfOf?: {
        login: string;
        avatarUrl: string;
    };
}

export enum StatusState {
    EXPECTED,
    ERROR,
    FAILURE,
    PENDING,
    SUCCESS,
}
