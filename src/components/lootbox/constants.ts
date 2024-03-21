import box1 from './box1.png'
import box2 from './box2.png'
import box3 from './box3.png'
import box4 from './box4.png'
import box5 from './box5.png'
type Lootbox = {
    price: number;
    pic: string;
};

export const lootboxesMock: Lootbox[] = [
    { pic: box1, price: 100 },
    { pic: box2, price: 10000 },
    { pic: box3, price: 200000 },
    { pic: box4, price: 50000000 },
    { pic: box5, price: 9000000000 },
];
