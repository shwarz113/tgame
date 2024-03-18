import { useEffect, useMemo, useState } from 'react';
import './index.css';
import { peopleFollowersMock, peopleFollowingMock, peopleRefsMock } from './constants';

const tabs = [
    { name: 'Search' },
    { name: 'Followers', amount: 0 },
    { name: 'Following', amount: 0 },
    { name: 'Refs', amount: 0 },
];

export const PeopleContainer = () => {
    const [tab, setTab] = useState('Search');
    const [search, setSearch] = useState('');
    const list = useMemo(() => {
        if (tab === 'Followers') return peopleFollowersMock;
        if (tab === 'Following') return peopleFollowingMock;
        if (tab === 'Refs') return peopleRefsMock;
        return [];
    }, [tab]);

    return (
        <div className={'people-container'}>
            <div className="people-container-tabs">
                <div
                    className={`people-container-tab ${tab === 'Search' ? 'active' : ''}`}
                    onClick={() => setTab('Search')}
                >
                    Search
                </div>
                <div className="devider"></div>
                <div
                    className={`people-container-tab ${tab === 'Followers' ? 'active' : ''}`}
                    onClick={() => setTab('Followers')}
                >
                    Followers
                </div>
                <div className="devider"></div>
                <div
                    className={`people-container-tab ${tab === 'Following' ? 'active' : ''}`}
                    onClick={() => setTab('Following')}
                >
                    Following
                </div>
                <div className="devider"></div>
                <div
                    className={`people-container-tab ${tab === 'Refs' ? 'active' : ''}`}
                    onClick={() => setTab('Refs')}
                >
                    Refs
                </div>
            </div>
            <div className={'people-container-content'}>
                <input type="search" placeholder={'type username'} value={search} />
                {list.map(({ pic, userName }) => (
                    <div key={userName} className={'person-item'}>
                        <div className="person-pic">
                            <img src={pic} />
                        </div>
                        <div className="person-name">{userName}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
