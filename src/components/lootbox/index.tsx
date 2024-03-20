import { nFormatter } from '../../utils/formatters';
import { Swiper, SwiperSlide } from 'swiper/react';
import { lootboxesMock } from './constants';
import coin from '../../coin.png';
import './index.css';
import 'swiper/css/bundle';

export const LootboxContainer = () => {
    return (
        <div className={'lootbox-container'}>
            <div className={'lootbox-title'}>your chance!</div>
            <div className={'lootbox-description'}>
                Each case has a gift for you. You have a chance to win a unique skin, NFT, more points or real
                cryptocurrencies.
            </div>
            <Swiper
                className={'lootbox-swiper'}
                slidesPerView={2}
                spaceBetween={20}
                centeredSlides={true}
            >
                {lootboxesMock.map(({ pic, price }) => (
                    <SwiperSlide key={price}>
                        <div className={'lootbox'}>
                            <div className={'lootbox-img'}>
                                <div></div>
                                <img src={pic} alt="" />
                            </div>
                            <div className={'lootbox-value'}><img src={coin} alt=""/>{nFormatter({ num: price })}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
