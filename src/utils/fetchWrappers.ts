import { constants } from "../constants";
import { IPrData, IPrDataRequest, isPrData, isPrDataRequest } from "../types";

export function getPullRequests(repoData: IPrDataRequest, storePullRequests: (data: IPrData) => void) {
    fetch(`${constants.baseURL}/reviews`, {
        body: JSON.stringify(repoData),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    })
        .then((res) => {
            res
                .json()
                .then((data) => {
                    if (isPrData(data)) {
                        storePullRequests(data);
                    } else {
                        console.warn("reviews.request.not.of.type.IPrData", data);
                    }
                })
                .catch((e) => console.error("json error", e));
        })
        .catch((e) => console.error("fetch error", e));
}

export function getRepos(storeRepos: (data: IPrDataRequest[]) => void) {
    fetch(`${constants.baseURL}/repos`, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    })
        .then((res) => {
            res
                .json()
                .then((data: IPrDataRequest[]) => {
                    if (data.every(isPrDataRequest)) {
                        storeRepos(data);
                    } else {
                        console.warn("repos.request.not.of.type.Repos", data);
                    }
                })
                .catch((e) => console.error("json error", e));
        })
        .catch((e) => console.error("fetch error", e));
}

export function putRepos(repos: IPrDataRequest[], storeRepos: (data: IPrDataRequest[]) => void) {
    fetch(`${constants.baseURL}/repos`, {
        body: JSON.stringify(repos),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
    })
        .then((res) => {
            res
                .json()
                .then((data: IPrDataRequest[]) => {
                    if (data.every(isPrDataRequest)) {
                        storeRepos(data);
                    } else {
                        console.warn("repos.request.not.of.type.Repos", data);
                    }
                })
                .catch((e) => console.error("json error", e));
        })
        .catch((e) => console.error("fetch error", e));
}
