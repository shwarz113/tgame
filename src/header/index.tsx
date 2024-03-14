import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../store/store';
import { ScoreHeader } from './score';
import {Accum} from "./accum";
import './index.css';
import {Link} from "react-router-dom";
export const Header = observer(() => {
    const {
        gameStore: { accum, accumCapacity, points, pointsPerSecond, isTap },
    } = useStore();

    return (
        <div className="header">
            <ScoreHeader points={points} pointsPerSecond={pointsPerSecond} isTap={isTap} />
            <Accum accum={accum} accumCapacity={accumCapacity} />
        </div>
    );
});
