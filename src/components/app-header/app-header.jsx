import React from 'react';
import appHeaderStyles from './app-header.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppHeader = () => {

  const { userName, isAuthenticated } = useSelector(store => store.userReducer);

  return(
    <header className={appHeaderStyles.header}>
      <div className={`${appHeaderStyles.headerContainer} pt-4 pb-4`}>
        <nav className={appHeaderStyles.linksBlock}>
          <div className="pt-4 pr-5 pb-4 pl-5">
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default">Конструктор</span>
          </div>
          <div className="pt-4 pr-5 pb-4 pl-5">
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
          </div>
        </nav>
        <div className={appHeaderStyles.logoBlock}>
          <Link to="/">
              <Logo />
          </Link>
        </div>
        <div className={appHeaderStyles.personalBlock}>
          <div className="pt-4 pr-5 pb-4 pl-5">
            <ProfileIcon type="secondary" />
            <Link to="/profile">
              {(isAuthenticated && userName)
                ? <span className="text text_type_main-default text_color_inactive">{userName}</span>
                : <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
              }
            </Link>
          </div>
        </div>
      </div>
    </header>
  )

}

export default AppHeader;
