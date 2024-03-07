import { Miner } from './miner';
import React from 'react';
import './index.css';

export const MinersContainer = () => {
    return (
        <div className={'miners-container'}>
            <div className="miners-room">
                <div className="miners-room-shelves"></div>
                <Miner name={'M1'}/>
                <Miner name={'M2'} size={'s'} animated={false}/>
            </div>
            <div className="miners-storage"></div>
        </div>
    );
};
