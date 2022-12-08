import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { ingredientType } from "../../constants/type-check";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerIngredients = ( { ingredients } ) => {

  const [current, setCurrent] = React.useState('null')

  const handlerIngredientClick = ( item ) => {
    setCurrent(item);
    setModalActive(true);
  }

  const [isModalActive, setModalActive] = React.useState(false);

  const bunArray = ingredients.filter(item => item.type === "bun");
  const sauceArray = ingredients.filter(item => item.type === "sauce");
  const mainArray = ingredients.filter(item => item.type === "main");

  return(
    <>
      <div className="pt-10 pl-5">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={`${burgerIngredientsStyles.ingredientsTabs} pt-5 pb-10`}>
          <Tab value="Булки" active={true} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="Соусы" active={false} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={false} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>

        <div className={burgerIngredientsStyles.ingredientsContainer}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={`${burgerIngredientsStyles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
            {bunArray.map((item) => (
              <li key={item._id} className={burgerIngredientsStyles.ingredientListItem} onClick={() => handlerIngredientClick(item)}>
                <IngredientCard
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </li>
            ))}
          </ul>

          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={`${burgerIngredientsStyles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
            {sauceArray.map((item) => (
              <li key={item._id} className={burgerIngredientsStyles.ingredientListItem} onClick={() => handlerIngredientClick(item)}>
                <IngredientCard
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </li>
            ))}
          </ul>

          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul className={`${burgerIngredientsStyles.ingredientsGroupList} pt-6 pb-8 pl-4`}>
            {mainArray.map((item) => (
              <li key={item._id} className={burgerIngredientsStyles.ingredientListItem} onClick={() => handlerIngredientClick(item)}>
                <IngredientCard
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isModalActive &&
        <Modal
            title={`Детали ингредиента`}
            onClose={() => setModalActive(false)}
        >
        <IngredientDetails ingredientData={current} />
        </Modal>
      }
    </>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
}

export default BurgerIngredients;
