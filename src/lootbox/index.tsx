import box from "../main-container/box.png";
import {nFormatter} from "../utils/formatters";
import { Swiper, SwiperSlide } from "swiper/react";
import './index.css';
import 'swiper/css';
export const LootboxContainer = () => {
    return (
        <div className={'lootbox-container'}>
            <div className="lootbox-container-title">your chance!</div>
            <div className="lootbox-container-description">
                Each case has a gift for you. You have a chance to win a unique skin, NFT, more points or real
                cryptocurrencies.
            </div>
            <div>
                <Swiper className="mySwiper">
                    <SwiperSlide>
                        <div>
                            <img src={box} alt="" />
                            <div>{nFormatter({ num: 100000 })}</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <img src={box} alt="" />
                            <div>{nFormatter({ num: 10000000 })}</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <img src={box} alt="" />
                            <div>{nFormatter({ num: 1000000000 })}</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
