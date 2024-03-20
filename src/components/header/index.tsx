import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../../store/store';
import { ScoreHeader } from './score';
import { Accum } from './accum';
import './index.css';
import { action } from 'mobx';
export const Header = observer(() => {
    const { gameStore } = useStore();
    const { accum, accumCapacity, points, pointsPerSecond, isTap } = gameStore;

    const handleIncPointsAction = action(() => {
        console.log('time!!');
        setTimeout(() => {
            gameStore.points += gameStore.pointsPerSecond;
            handleIncPointsAction();
        }, 1000);
    });

    useEffect(() => {
        handleIncPointsAction();
    }, []);

    console.log('Header')

    return (
        <div className="header">
            <ScoreHeader points={points} pointsPerSecond={pointsPerSecond} isTap={isTap} />
            <Accum accum={accum} accumCapacity={accumCapacity} />
        </div>
    );
});
