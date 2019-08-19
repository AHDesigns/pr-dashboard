import React from 'react';
import openSocket from 'socket.io-client';
import { constants } from '../constants';
import { IPrData, isPrData } from '../types';

interface IProps {
    children: (reposData: IPrData[]) => any;
    subscribedRepos: string[];
}

interface IState {
    reposData: IPrData[];
    socket: SocketIOClient.Socket;
}

export class Provider extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            reposData: [],
            socket: openSocket(constants.baseURL, { hostname: 'cheese' }),
        };
    }

    componentDidMount(): void {
        const { socket } = this.state;
        socket.emit('availableRepos', this.props.subscribedRepos);

        socket.on('connect', () => {
            socket.emit('availableRepos', this.props.subscribedRepos);
        });

        this.updateRepos = this.updateRepos.bind(this);

        socket.on('reviews', this.updateRepos);
    }

    componentDidUpdate(oldProps: IProps): void {
        const { subscribedRepos } = this.props;
        if (subscribedRepos !== oldProps.subscribedRepos) {
            this.state.socket.emit('availableRepos', subscribedRepos);
        }

        // ignoring repo, so remove
        if (subscribedRepos < oldProps.subscribedRepos) {
            this.setState(state => ({
                reposData: state.reposData.filter(repo => subscribedRepos.includes(repo.name)),
            }));
        }
    }

    updateRepos(data: IPrData): void {
        const { reposData } = this.state;

        if (isPrData(data)) {
            const isAlreadyKnownRepo = reposData.map(r => r.name).includes(data.name);
            const updatedData = isAlreadyKnownRepo
                ? reposData.map(repo => (repo.name === data.name ? data : repo))
                : reposData.concat(data);

            this.setState({ reposData: updatedData });
        } else {
            console.warn('not IPrData', data);
        }
    }

    render(): React.ReactChild {
        return <div className="repos">{this.props.children(this.state.reposData)}</div>;
    }
}
