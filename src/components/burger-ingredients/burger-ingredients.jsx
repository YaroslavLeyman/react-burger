/* eslint-disable default-case */
import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_INGREDIENT } from '../../services/burgerConstructorActions';


const BurgerIngredients = () => {

  const bunsRef = React.useRef();
  const saucesRef = React.useRef();
  const mainRef = React.useRef();

  const [currentTab, setCurrentTab] = React.useState("Булки");

  const dispatch = useDispatch();

  const setCurrent = (event) => {
    let tabToScroll;
    switch(event) {
      case 'Булки':
        tabToScroll = bunsRef;
        break;
      case 'Соусы':
        tabToScroll = saucesRef;
        break;
      case 'Начинки':
        tabToScroll = mainRef;
        break;
      default:
        break;
    }
    tabToScroll.current.scrollIntoView( {behavior: "smooth"} );
    setCurrentTab(event);
  }

  const ingredients = useSelector(store => store.burgerConstructorReducer.allIngredients);

  const handlerIngredientClick = ( item ) => {
    dispatch( { type: SET_CURRENT_INGREDIENT, payload: item } );
    setModalActive(true);
  }

  const [isModalActive, setModalActive] = React.useState(false);

  const bunArray = React.useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
  const sauceArray = React.useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
  const mainArray = React.useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);

  const handleCloseModal = () => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      payload: null
    });
    setModalActive(false);
  }

  return(
    <>
      <div className="pt-10 pl-5">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={`${burgerIngredientsStyles.ingredientsTabs} pt-5 pb-10`}>
          <Tab value="Булки" active={currentTab === 'Булки'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>

        <div className={burgerIngredientsStyles.ingredientsContainer}>
          <h2 className="text text_type_main-medium" ref={bunsRef}>Булки</h2>
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

          <h2 className="text text_type_main-medium" ref={saucesRef}>Соусы</h2>
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

          <h2 className="text text_type_main-medium" ref={mainRef}>Начинки</h2>
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
          onClose={handleCloseModal}
        >
        <IngredientDetails />
        </Modal>
      }
    </>
  )
}

export default BurgerIngredients;
