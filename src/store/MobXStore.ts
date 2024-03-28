import { action, makeAutoObservable } from 'mobx';
import {Investment, UserInfo} from '../hooks/type';
import { Client } from '@stomp/stompjs';
import { SOCKET_URL } from '../constants';
import {BalanceResponse, InvestResponse} from "./types";

class MobXApp {
    client: Client | undefined;
    commonInfo?: UserInfo;
    balance: number = 0;
    income: number = 0;
    battery: number = 0;
    userName: string = '';
    isLoading = true;
    investments: Investment[] = [];

    constructor() {
        // @ts-ignore
        this.userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username || 'Это тест';
        makeAutoObservable(this);
        console.log('mobx');
        this.client = new Client({
            brokerURL: SOCKET_URL,
            onConnect: () => {
                this.client?.subscribe('/user/topic/user', (message) => this.setUserInfo(message.body));
                this.client?.subscribe('/user/topic/errors', (message) => alert(message.body));
                this.client?.subscribe('/user/topic/balance', (message) => this.balanceWatcher(message.body));
                this.client?.subscribe('/user/topic/invest', (message) => this.investWatcher(message.body));
                this.client?.publish({ destination: '/ws/user', body: this.userName });
            },
        });
        this.client?.activate();
        this.enablePassiveIncreaseBalance();
    }

    @action
    setUserInfo(value: string) {
        const userInfo = JSON.parse(value) as UserInfo;
        const { balance = 0, battery, income = 0, investments } = userInfo;
        this.commonInfo = userInfo;
        console.log('userInfo', userInfo);
        this.balance = balance || 0;
        this.battery = battery.currentValue || 0;
        this.income = income || 0;
        this.investments = investments;
        this.isLoading = false;
    }

    @action
    handleTap() {
        this.client?.publish({
            destination: '/ws/tap',
            body: JSON.stringify({ balance: this.balance, userId: this.userName }),
        });
    }

    @action
    balanceWatcher(v: string) {
        const { balance, batteryValue} = JSON.parse(v) as BalanceResponse;
        this.balance = balance;
        this.battery = batteryValue;
    }
    @action
    handleBuyInvest(investId: string) {
        this.client?.publish({
            destination: '/ws/invest/buy',
            body: JSON.stringify({ balance: this.balance, userId: this.userName, investId }),
        });
    }
    @action
    investWatcher(v: string) {
        const res = JSON.parse(v) as InvestResponse;
        const { balance, income, investment } = res;
        this.balance = balance;
        this.income = income;
        this.investments = this.investments.map((item) => item.id === investment.id ? investment : item);
    }

    @action
    enablePassiveIncreaseBalance() {
        if (this.income) this.balance += this.income;
        setTimeout(() => {
          this.enablePassiveIncreaseBalance();
        }, 1100)
    }
}

export type MobXAppStore = MobXApp;
export default new MobXApp();
