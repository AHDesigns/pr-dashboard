import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { constants } from "../constants";
import { IPrData, isPrData } from "../types";

const initialReposData: IPrData[] = [{ name: "loading", pullRequests: [] }];

let socket: SocketIOClient.Socket;

export const Provider: React.FC<{
    children: (reposData: IPrData[]) => any,
    subscribedRepos: string[],
}> = ({ children, subscribedRepos }) => {
    const [reposData, setReposData] = useState(initialReposData);
    console.log(reposData);

    useEffect(() => {
        socket = openSocket(constants.baseURL, { hostname: "cheese" });
        socket.on("reconnect_failed", status("failed"));
        socket.on("reconnect_attempt", status("attempt to connect"));
    });

    useEffect(() => {
        console.log("updated sub");
        // remove the old listener with old data;
        socket.removeListener("connect", emitRepos(socket, subscribedRepos));
        socket.on("connect", emitRepos(socket, subscribedRepos));

        // remove the old listener with old data;
        socket.removeListener("reviews", updateRepos(setReposData, reposData));
        socket.on("reviews", updateRepos(setReposData, reposData));

        // send subscription to server
        socket.emit("availableRepos", subscribedRepos);
    }, [subscribedRepos]);

    if (children) {
        return (children(reposData));
    }
};

function emitRepos(sock: SocketIOClient.Socket, availableRepos: string[]) {
    return () => {
        console.log("connected and sending availableRepos", availableRepos);
        sock.emit("availableRepos", availableRepos);
    };
}

function updateRepos(
    setReposData: React.Dispatch<React.SetStateAction<IPrData[]>>,
    reposData: IPrData[],
) {
    return function(data: IPrData): void {
        // TODO: this is not the up to date pr data, but a copy of the data
        // at the time the funtion was first called
        console.log("called", data, reposData.map((p) => p.name));
        if (isPrData(data)) {
            const isAlreadyKnownRepo = reposData.map((r) => r.name).includes(data.name);
            console.log(isAlreadyKnownRepo);
            const updatedData = isAlreadyKnownRepo
                              ? reposData.map((repo) => repo.name === data.name ? data : repo)
                              : reposData.concat(data);
            setReposData(updatedData);
        } else {
            console.error("not IPrData", data);
        }
    };
}

function status(msg: string) {
    return () => {
        console.log(msg);
    };
}
