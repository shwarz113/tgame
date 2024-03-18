import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../store/store';
import { ScoreHeader } from './score';
import {Accum} from "./accum";
import './index.css';
import {useSubscription} from "react-stomp-hooks";
export const Header = observer(() => {
    const {
        gameStore: { accum, accumCapacity, points, pointsPerSecond, isTap },
    } = useStore();

    useSubscription("/topic/user", (message) => console.log('message', message.body));

    return (
        <div className="header">
            <ScoreHeader points={points} pointsPerSecond={pointsPerSecond} isTap={isTap} />
            <Accum accum={accum} accumCapacity={accumCapacity} />
        </div>
    );
});
