import { DOMAIN } from './constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { memo, useEffect } from 'react';
// @ts-ignore
const tg = window.Telegram.WebApp;
export const Init = memo(() => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    console.log('tg', tg);
    const BackButton = tg.BackButton;
    BackButton.onClick(function () {
        navigate(DOMAIN);
    });

    useEffect(() => {
        tg?.expand();
        tg?.setHeaderColor('#000');
        document.querySelector('.main-container-bg')?.addEventListener('touchmove', (e) => {
            e.preventDefault();
        })
    }, []);

    useEffect(() => {
        tg?.onEvent('viewportChanged', () => tg?.expand());
    }, [tg?.isExpanded]);

    useEffect(() => {
        if (pathname === DOMAIN) {
            BackButton.hide();
        } else {
            BackButton.show();
        }
    }, [pathname]);

    return <></>;
});
