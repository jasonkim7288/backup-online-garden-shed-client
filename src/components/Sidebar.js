import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';

const Sidebar = () => {
  const { state } = useGlobalState();
  const { currentUser } = state;
  let history = useHistory();

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
    history.push(event.target.dataset.link);
  };

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
            <img src={menuItem.image} alt={menuItem.title} data-link={menuItem.link} className="sidebar-image"/>
            <p data-link={menuItem.link}>{menuItem.title}</p>
          </div>
        ))
      }
    </aside>
  );
};

export default Sidebar;
