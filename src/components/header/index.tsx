import { observer } from 'mobx-react-lite';
import React, {FC, useEffect} from 'react';
import { useStore } from '../../store/store';
import { ScoreHeader } from './score';
import { Accum } from './accum';
import './index.css';
import { action } from 'mobx';
import {MobXAppStore} from "../../store/MobXStore";

type Props = {
    app: MobXAppStore;
}
export const Header: FC<Props> = observer(({ app }) => {
    const { gameStore } = useStore();
    const { accum, accumCapacity, points, pointsPerSecond, isTap } = gameStore;

    const handleIncPointsAction = action(() => {
        setTimeout(() => {
            if (gameStore.pointsPerSecond) gameStore.points += gameStore.pointsPerSecond;
            handleIncPointsAction();
        }, 1000);
    });

    useEffect(() => {
        handleIncPointsAction();
    }, []);

    return (
        <div className="header">
            <ScoreHeader points={app.balance} pointsPerSecond={app.income} isTap={isTap} />
            <Accum accum={app.battery} accumCapacity={app.commonInfo?.battery.capacity || 0} />
        </div>
    );
});
