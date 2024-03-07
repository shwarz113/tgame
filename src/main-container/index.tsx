import React, { FC, useState } from 'react';
import rocket from '../rocket.png';
import thunder from '../thunder.png';
import store from './store1.png';
import './index.css';
import {Popup} from "./popups";
import {Investments} from "./popups/investments";

const ACCUM = 100;
const INC_VALUE = 1;
const INC_TURBO_VALUE = 5;
const TOUCHES = 0;

type Props = {
    points: number;
    setPoints: (v: number) => void;
};
export const MainContainer: FC<Props> = ({ points, setPoints }) => {
    const [incValue, setIncValue] = useState(INC_VALUE);
    const [accum, setAccum] = useState(ACCUM);
    const [touches, setTouches] = useState(TOUCHES);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const handleCoinClick = () => {
        if (accum) {
            setPoints(points + incValue);
            setAccum(accum - 1);
        }
    };
    const handleTurboClick = () => {
        if (incValue !== INC_TURBO_VALUE) {
            setIncValue(INC_TURBO_VALUE);
            setTimeout(() => setIncValue(INC_VALUE), 3000);
        }
    };
    const handleStoreClick = () => {
        setIsOpenPopup(true);
    };
    const handleAccumClick = () => {
        if (accum !== 10) {
            setAccum(ACCUM);
        }
    };

    return (
        <div className={'main-container'}>
            <div className="main-container-bg" onClick={handleCoinClick}><div></div></div>
            <div className="App-footer">
                <img src={thunder} alt="energy"/> {accum} / {ACCUM}
            </div>
            <div className={'instruments'}>
                <div id="store" onClick={handleStoreClick}>
                    <img src={store} alt="store"/>
                </div>
                <div id="turbo" onClick={handleTurboClick}>
                    <img src={rocket} alt="turbo"/>
                </div>
                <span className="devider"></span>
                <div id="accum" onClick={handleAccumClick}>
                    <img src={thunder} alt="energy"/>
                </div>
            </div>
            { isOpenPopup && (
                <Popup title={'INVESTMENTS'} onClose={() => setIsOpenPopup(false)}>
                    <Investments/>
                </Popup>
            )}
        </div>
    );
};
