import box from "../main-container/box.png";
import {nFormatter} from "../../utils/formatters";
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
                <Swiper
                    slidesPerView={3}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    centeredSlides={true}
                    autoplay={true}
                    observer={true}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        // when window width is >= 480px
                        580: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        // when window width is >= 640px
                        680: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },

                        800: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                >
                    <SwiperSlide key={1}>
                        <div>
                            <img src={box} alt="" />
                            <div>{nFormatter({ num: 100000 })}</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide key={2}>
                        <div>
                            <img src={box} alt="" />
                            <div>{nFormatter({ num: 100000 })}</div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide key={3}>
                        <div>
                            <img src={box} alt="" />
                            <div>{nFormatter({ num: 100000 })}</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
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
