import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { baseUrl } from '../../constants/api';

const App = () => {

  const [state, setState] = React.useState({
    ingredientsData: []
  })

  React.useEffect(() => {

    const getIngredientsData = () => {
      fetch(baseUrl)
        .then((response) => {
          if(response.ok) {
            return response.json();
          }
          return Promise.reject(`Ошибка ${response.status}`);
        })
        .then((responseData) => setState ({ ingredientsData: responseData.data }))
        .catch((error) => {
          alert("Ошибка при загрузке данных: " + error)
        });
    }

    getIngredientsData();

  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.ingredientsSection}>
          <BurgerIngredients ingredients={state.ingredientsData} />
        </section>
        <section>
          <BurgerConstructor ingredients={state.ingredientsData} />
        </section>
      </main>
    </>
  );
}

export default App;
