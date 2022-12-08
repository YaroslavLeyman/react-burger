import React from 'react';
import appHeaderStyles from './appHeaderStyles.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {

  return(
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.headerContent}>
        <nav className={appHeaderStyles.nav}>
          <ul className={appHeaderStyles.list}>
            <li className={`${appHeaderStyles.listBox} pt-4 pr-5 pb-4 pl-5`}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default">Конструктор</span>
            </li>
            <li className={`${appHeaderStyles.listBox} pt-4 pr-5 pb-4 pl-5`}>
              <ListIcon type="secondary" />
              <span className="tex text_type_main-default text_color_inactive">Лента заказов</span>
            </li>
          </ul>
        </nav>
        <Logo />
        <div className={`${appHeaderStyles.listBox} pt-4 pr-5 pb-4 pl-5`}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
        </div>
      </div>
    </header>
  )

}

export default AppHeader;
