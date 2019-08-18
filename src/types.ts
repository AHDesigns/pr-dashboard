export enum reviewStates {
    PENDING,
    COMMENTED,
    APPROVED,
    CHANGES_REQUESTED,
    DISMISSED,
}

export interface IPrDataRequest {
    name: string;
    owner: string;
    prCount: number;
    reviewsCount: number;
}

export function isPrDataRequest(data: any): data is IPrDataRequest {
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

// seems a bit flakey
export function isPrData(data: any): data is IPrData {
    return typeof data === 'object' && typeof data.name === 'string' && Array.isArray(data.pullRequests);
}

export enum StatusState {
    // Status is expected.
    EXPECTED,
    // Status is errored.
    ERROR,
    // Status is failing.
    FAILURE,
    // Status is pending.
    PENDING,
    // Status is successful.
    SUCCESS,
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
