import pic from './pic.png';
import rocket from './rocket.png';
import thunder from './thunder.png';
import './App.css';
import {useState} from "react";

const tg = window.Telegram.WebApp;
const ACCUM = 100;
const INC_VALUE = 1;
const INC_TURBO_VALUE = 5;

function App() {
    const [points, setPoints] = useState(0);
    const [incValue, setIncValue] = useState(INC_VALUE);
    const [accum, setAccum] = useState(ACCUM);
    console.log('tg', tg);
    const handleCoinClick = () => {
        if (accum) {
            setPoints(points + incValue);
            setAccum(accum - 1);
        }
    }
    const handleTurboClick = () => {
        if (incValue !== INC_TURBO_VALUE) {
            setIncValue(INC_TURBO_VALUE);
            setTimeout(() => setIncValue(INC_VALUE), 3000);
        }
    }
    const handleAccumClick = () => {
        if (accum !== 10) {
            setAccum(ACCUM);
        }
    }

  return (
      <div className="App">
          <div className="App-header">
              <div>Hello, {tg.initDataUnsafe?.user?.first_name || 'cryptoBRO'}!</div>
              <div>COINS: {points}</div>
          </div>
          <div className={'instruments'}>
              <div id="turbo" onClick={handleTurboClick}>
                  <img src={'rocket.png'} alt="turbo"/>
              </div>
              <span className="devider"></span>
              <div id="accum" onClick={handleAccumClick}>
                  <img src={thunder} alt="energy"/>
              </div>
          </div>
          <div className="App-body">
              <div id="coin" onClick={handleCoinClick}>
              <img src={pic} alt="coin"/>
              </div>
          </div>
          <div className="App-footer">
              <img src={thunder} alt="energy"/> {accum} / {ACCUM}
          </div>
      </div>
  );
}

export default App;
