import React, { useState } from "react";
import "./App.css";
import { IPrData } from "../types";
import { Provider } from "./SocketProvider";
import { RepoInfo } from "./RepoSelector";
import Repo from "./Repo";

const initialSubscribedRepos: string[] = [];

const App: React.FC = () => {
    const [subscribedRepos, setSubscribedRepos] = useState(initialSubscribedRepos);

    return (
        <div className="App">
            <RepoInfo
                subscribedRepos={subscribedRepos}
                setSubscribedRepos={setSubscribedRepos}
            />
            <Provider subscribedRepos={subscribedRepos} >
                {(reposData: IPrData[]) => (
                    reposData.map((data) => <Repo reposData={data} />)
                )}
            </Provider>
        </div>
    );
};

export default App;
