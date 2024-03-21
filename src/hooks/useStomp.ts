import {useEffect, useRef, useState} from 'react';
import { Client } from '@stomp/stompjs';
import { SOCKET_URL } from '../constants';

type ReturnHook = {
    client?: Client;
};
export const useStomp = (): ReturnHook => {
    const client = useRef<Client>();
    // @ts-ignore
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.username || 'это тест (значит username не считался)'

    console.log('useStomp');

    useEffect(() => {
        client.current = new Client({
            brokerURL: SOCKET_URL,
            onConnect: () => {
                client.current?.publish({ destination: '/ws/user', body: JSON.stringify({ userId }) });
                client.current?.subscribe('/user/topic/user', (message) => console.log(`Received: ${message.body}`));
            },
        });
        client.current?.activate();
    }, []);

    return { client: client.current };
};
