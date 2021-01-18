import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';

const Sidebar = () => {
  const { state } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  let history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      title: 'My Garden Shed',
      image: `${process.env.PUBLIC_URL}/menuMyGardenShed.png`,
      link: '/user/my-shed'
    },
    {
      title: 'Create Record',
      image: `${process.env.PUBLIC_URL}/menuCreateRecord.png`,
      link: currentUser ? `/sheds/${currentUser.shed}/records/new` : '#'
    },
    {
      title: 'Following',
      image: `${process.env.PUBLIC_URL}/menuFollowingSheds.png`,
      link: '/user/following-sheds'
    },
    {
      title: 'Following',
      image: `${process.env.PUBLIC_URL}/menuFollowingPlants.png`,
      link: '/user/following-plants'
    },
    {
      title: 'User Guide',
      image: `${process.env.PUBLIC_URL}/menuFollowingPlants.png`,
      link: '/user-guide'
    },
    {
      title: 'Mission Statement',
      image: `${process.env.PUBLIC_URL}/menuMissionStatement.png`,
      link: '/mission-statement'
    }
  ];

  const handleClick = (event) => {
    const { link } = event.target.dataset;
    if (link !== '/mission-statement' && !isSignedIn) {
      history.push('/');
    } else {
      history.push(link);
    }
  };

  return (
    <>
      {
        location.pathname !== '/' &&
          <aside>
            {
              menuItems.map(menuItem => (
                <div to={menuItem.link}
                    className="sidebar-item-wrapper"
                    key={menuItem.image}
                    onClick={handleClick}
                    data-link={menuItem.link}
                >
                  <img src={menuItem.image} alt={menuItem.title} data-link={menuItem.link} className="sidebar-image"/>
                  <p className="text-center" data-link={menuItem.link}>{menuItem.title}</p>
                </div>
              ))
            }
          </aside>
      }
    </>
  );
};

export default Sidebar;
