import { FC } from 'react';
import Bg from './#.svg';
import './index.css';

type Props = {
    name: string;
    size?: 's' | 'm' | 'l';
    animated?: boolean;
};
export const Miner: FC<Props> = ({ name, size = 'm', animated = true }) => {
    return (
        <div className={`miner-wrapper miner-wrapper-${size} ${animated ? 'miner-wrapper-animated' : ''}`}>
            <div className={'miner-body'}>
                <div className={'miner-body-light'}></div>
                <div className={'miner-body-air'}>
                    <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="121.000000pt"
                        height="121.000000pt"
                        viewBox="0 0 121.000000 121.000000"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g
                            transform="translate(0.000000,121.000000) scale(0.100000,-0.100000)"
                            fill="#000000"
                            stroke="none"
                        >
                            <path
                                d="M509 1186 c-2 -3 -16 -7 -29 -10 -14 -2 -35 -8 -48 -13 -22 -8 -21
-10 28 -67 27 -33 59 -80 70 -105 35 -78 32 -76 106 -82 38 -3 79 -10 90 -17
27 -14 37 -4 60 59 18 49 21 196 4 213 -5 5 -33 13 -62 17 -58 8 -212 12 -219
5z"
                            />
                            <path
                                d="M188 1018 c-68 -63 -161 -251 -145 -292 4 -10 19 -10 78 2 55 11 89
12 136 5 l63 -9 25 42 c13 22 40 55 60 73 22 19 33 36 29 44 -25 41 -73 90
-118 120 -77 51 -88 53 -128 15z"
                            />
                            <path
                                d="M965 988 c-19 -59 -45 -106 -86 -157 l-28 -34 25 -43 c14 -23 28 -62
32 -85 6 -38 11 -44 35 -47 51 -6 222 63 234 94 8 22 -45 162 -84 221 -34 51
-86 103 -103 103 -5 0 -16 -24 -25 -52z"
                            />
                            <path
                                d="M545 851 c-73 -19 -142 -79 -171 -147 -22 -52 -18 -160 7 -211 59
-122 221 -171 350 -105 95 48 145 164 120 278 -16 70 -63 133 -123 162 -50 25
-135 36 -183 23z"
                            />
                            <path
                                d="M180 574 c-25 -8 -67 -27 -95 -42 -47 -26 -50 -30 -47 -62 6 -76 145
-300 186 -300 7 0 19 19 26 42 17 58 53 128 86 167 l27 32 -26 52 c-14 29 -28
69 -32 90 -7 35 -9 37 -44 36 -20 0 -56 -7 -81 -15z"
                            />
                            <path
                                d="M1105 488 c-22 -5 -79 -7 -128 -4 l-87 5 -19 -37 c-11 -20 -35 -53
-55 -71 -20 -19 -36 -40 -36 -47 0 -22 124 -138 168 -158 l42 -19 26 24 c66
61 140 195 159 287 7 36 2 38 -70 20z"
                            />
                            <path
                                d="M449 303 c-25 -61 -39 -131 -39 -189 l0 -62 45 -11 c88 -22 188 -25
268 -7 43 10 77 21 77 26 0 4 -14 23 -32 41 -39 42 -92 125 -105 164 -9 28
-14 30 -74 37 -35 3 -77 11 -92 17 -37 15 -36 15 -48 -16z"
                            />
                        </g>
                    </svg>
                    <div className={'miner-body-name'}>{name}</div>
                </div>
            </div>
            <div className={'miner-base'}></div>
        </div>
    );
};
