import React from 'react';
import { useGlobalState } from '../config/globalState';

const Sidebar = () => {
  const { state } = useGlobalState();
  const { currentUser } = state;
  const menuItems = [
    {
      title: 'My Garden Shed',
      image: `${process.env.PUBLIC_URL}/menuMyGardenShed.png`,
      link: '/my-shed'
    },
    {
      title: 'Create Record',
      image: `${process.env.PUBLIC_URL}/menuCreateRecord.png`,
      link: currentUser ? `/sheds/${currentUser.shed}/records/new` : '#'
    },
    {
      title: 'Following',
      image: `${process.env.PUBLIC_URL}/menuFollowingSheds.png`,
      link: '/following-sheds'
    },
    {
      title: 'Following',
      image: `${process.env.PUBLIC_URL}/menuFollowingPlants.png`,
      link: '/following-plants'
    },
    {
      title: 'Mission Statement',
      image: `${process.env.PUBLIC_URL}/menuMissionStatement.png`,
      link: '/mission-statement'
    }
  ];

  const handleClick = (event) => {
    if (currentUser) {

    }
  }

  return (
    <aside>
      {
        menuItems.map(menuItem => (
          <div to={menuItem.link}
              className="sidebar-item-wrapper"
              key={menuItem.image}
              onClick={handleClick}
              data-link={menuItem.link}
          >
            <img src={menuItem.image} alt={menuItem.title} className="sidebar-image"/>
            <p>{menuItem.title}</p>
          </div>
        ))
      }
    </aside>
  );
};

export default Sidebar;
