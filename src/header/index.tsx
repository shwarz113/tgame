import { observer } from 'mobx-react-lite';
import './index.css';
import { useStore } from '../store/store';
import { ScoreHeader } from './score';
import thunder from '../thunder.png';
import React from 'react';
export const Header = observer(() => {
    const {
        gameStore: { accum },
    } = useStore();

    return (
        <div className="header">
            <ScoreHeader />
            <div className={'header-accum'}>
                <img src={thunder} alt="energy" /> {accum}
            </div>
        </div>
    );
});
