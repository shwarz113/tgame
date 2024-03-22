import {action, makeAutoObservable, makeObservable, observable} from 'mobx';
import { UserInfo } from '../hooks/type';
import { Client } from '@stomp/stompjs';
import { SOCKET_URL } from '../constants';

class MobXApp {
    client: Client | undefined;
    points: number = 0;
    userName: string = '';
    isLoading = true;

    constructor() {
        // @ts-ignore
        this.userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username || 'Это тест';
        makeAutoObservable(this);
        console.log('mobx');
        this.client = new Client({
            brokerURL: SOCKET_URL,
            onConnect: () => {
                this.client?.subscribe('/user/topic/user', (message) => this.setUserInfo(message.body));
                this.client?.subscribe('/user/topic/balance', (message) => this.updatePoints(+message.body));
                this.client?.publish({ destination: '/ws/user', body: this.userName });
            },
        });
        this.client?.activate();
    }

    @action
    setUserInfo(value: string) {
        const userInfo = JSON.parse(value) as UserInfo;
        console.log('userInfo', userInfo)
        this.points = userInfo?.balance || 0;
        this.isLoading = false;
    }
    @action
    updatePoints(v: number) {
        this.points = v;
    }
    @action
    handleTap() {
        this.client?.publish({ destination: '/ws/tap', body: this.userName });
    }
    @action
    handleBuy(name: string, points: number, isUpgrades = false) {}
}

export default new MobXApp();