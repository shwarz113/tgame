import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Client} from "@stomp/stompjs";
import {action} from "mobx";
import {useStore} from "../store/store";

type P = {
    client?: Client;
    setUserInfo: (v: string) => void;
}
export const SocketAction: FC<P> = observer(({ client, setUserInfo }) => {
    const { gameStore } = useStore();
    const setUserInfoAction = action((info: string) => setUserInfo(info));

    useEffect(() => {
        client?.subscribe('/user/topic/user', (message) => setUserInfoAction(message.body));
        client?.subscribe('/user/topic/balance', (message) => console.log(`Received: ${message.body}`));
    }, []);
    return <></>
})