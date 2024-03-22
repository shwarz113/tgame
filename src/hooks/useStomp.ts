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
        },
    });

    const getClient = () => client;

    useEffect(() => {
        client.activate();
    }, []);

    return { client, getClient };
};
