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
    return typeof data === "object"
        && typeof data.name === "string"
        && typeof data.owner === "string"
        && typeof data.prCount === "number"
        && typeof data.reviewsCount === "number";
}

export interface IPrData {
  name: string;
  pullRequests: IPullRequest[];
}

// seems a bit flakey
export function isPrData(data: any): data is IPrData {
    return typeof data === "object"
        && typeof data.name === "string"
        && Array.isArray(data.pullRequests);
}

export interface IPullRequest {
    isDraft: boolean;
    isFailing: boolean;
    title: string;
    url: string;
    author?: {
        login: string,
        avatarUrl: string,
    };
    reviews: {
        state: reviewStates,
        uniqueReviews: IUniqueReview[],
    };
}

// export function isPullRequest(arr: undefined[] | IPullRequest[]): arr is IPullRequest[] {
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

export interface IUniqueReview {
    state: reviewStates;
    url: string;
    author: {
        login: string,
        avatarUrl: string,
    };
    onBehalfOf?: {
        login: string,
        avatarUrl: string,
    };
}
