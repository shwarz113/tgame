type Person = {
    userName: string;
    pic: string;
};
type People = Person[];
export const peopleFollowersMock: People = [
    { userName: 'shwarz777', pic: 'https://randomuser.me/api/portraits/thumb/men/75.jpg' },
    { userName: 'vika1993', pic: 'https://randomuser.me/api/portraits/thumb/women/7.jpg' },
];
export const peopleFollowingMock: People = [
    { userName: 'kolek1113', pic: 'https://randomuser.me/api/portraits/thumb/men/5.jpg' },
    { userName: 'serega228', pic: 'https://randomuser.me/api/portraits/thumb/men/15.jpg' },
];
export const peopleRefsMock: People = [
    { userName: 'olega1', pic: 'https://randomuser.me/api/portraits/thumb/men/90.jpg' },
    { userName: 'ponchik14', pic: 'https://randomuser.me/api/portraits/thumb/men/2.jpg' },
];
