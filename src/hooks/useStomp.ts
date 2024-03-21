import {useEffect, useRef, useState} from 'react';
import { Client } from '@stomp/stompjs';
import { SOCKET_URL } from '../constants';

type ReturnHook = {
    client?: Client;
    getClient: () => Client;
};
export const useStomp = (): ReturnHook => {
    // @ts-ignore
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.username || 'это тест (значит username не считался)';

    const client = new Client({
        brokerURL: SOCKET_URL,
        onConnect: () => {
            client.publish({ destination: '/ws/user', body: userId });
            client.subscribe('/user/topic/user', (message) => console.log(`Received: ${message.body}`));
            client.subscribe('/topic/balance', (message) => console.log(`Received: ${message.body}`));
        },
    });

    const getClient = () => client;

    useEffect(() => {
        client.activate();
    }, []);

    return { client, getClient };
};
