import React, { useState, useRef, useEffect } from 'react'; 
import './Dashboard.css';
import Sidebar from '../../SidebarComponents/Sidebar/Sidebar.js';
import MenuHub from '../MenuHub/MenuHub.js';
import DashboardScreen from '../../DashboardContentComponents/DashboardScreen.js';

const Dashboard = () => {
  
  const [isMenuHubDisplayed, setIsMenuHubDisplayed] = useState(false);
  const [isSettingsMenuDisplayed, setIsSettingsMenuDisplayed] = useState(false);
  const [currentActive, setCurrentActive] = useState(1);

  const refs = [
    { id: 1, ref: useRef(null), name: 'home' },
    { id: 2, ref: useRef(null), name: 'trending' },
    { id: 3, ref: useRef(null), name: 'charts' },
    { id: 4, ref: useRef(null), name: 'comparison' }
  ];

  const [isObserving, setIsObserving] = useState(true);

  useEffect(() => {

    if(!isObserving)
    {
      return;
    }

    const observer = new IntersectionObserver(
      (changedObjects) => {
        let mostVisibleObj = null;

        changedObjects.forEach(obj => {
          if (obj.isIntersecting) {

            if (!mostVisibleObj || obj.intersectionRatio > mostVisibleObj.intersectionRatio) {
              mostVisibleObj = obj;
            }

          }
        });

        if (mostVisibleObj) {
          const found = refs.find(r => r.ref.current === mostVisibleObj.target);

          if (found) {
            setCurrentActive(found.id);
          }
        }
      },
      {
        threshold: 0.5
      }
    );

    refs.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs]);


  return (
    <div className='dashboard-container'>
        <Sidebar setIsMenuHubDisplayed={setIsMenuHubDisplayed} isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed} currentActive={currentActive} setCurrentActive={setCurrentActive} refs={refs} setIsObserving={setIsObserving}/>
        <MenuHub isMenuHubDisplayed={isMenuHubDisplayed} setIsMenuHubDisplayed={setIsMenuHubDisplayed} isSettingsMenuDisplayed={isSettingsMenuDisplayed} setIsSettingsMenuDisplayed={setIsSettingsMenuDisplayed}/>
        <DashboardScreen currentActive={currentActive} setCurrentActive={setCurrentActive} refs={refs} />
    </div>
  )
}

export default Dashboard;
