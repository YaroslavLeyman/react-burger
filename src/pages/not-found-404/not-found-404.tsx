import React, { FC } from 'react';
import notFoundStyles from './not-found-404.module.css';
import { Link } from 'react-router-dom';

export const NotFound404: FC = () => {

  return (
    <section className={notFoundStyles.notFoundWrapper}>
      <div className={notFoundStyles.notFound}>
        <h1 className="text text_type_digits-large">404</h1>
        <p>Такой страницы у нас нет.</p>
        <p>
          <Link to = '/'>Перейти на главную</Link>
        </p>
      </div>
    </section>
  )

}
