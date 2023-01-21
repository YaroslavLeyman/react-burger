import React from 'react';
import mainStyles from './main.module.css'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const MainPage = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={mainStyles.main}>
          <section className={mainStyles.mainSection}>
            <BurgerIngredients />
          </section>
          <section className={mainStyles.mainSection}>
            <BurgerConstructor />
          </section>
        </main>
      </DndProvider>
    </>
  );
}
