/* eslint-disable default-case */
import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';



const BurgerIngredients = () => {

  const bunsRef = React.useRef();
  const saucesRef = React.useRef();
  const mainRef = React.useRef();
  const containerRef = React.useRef();

  const location = useLocation();

  const [currentTab, setCurrentTab] = React.useState("Булки");

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

  const handlerScroll = () => {
    const containerY = containerRef.current.getBoundingClientRect().y;
    const bunsOffset = Math.abs(bunsRef.current.getBoundingClientRect().y - containerY);
    const saucesOffset = Math.abs(saucesRef.current.getBoundingClientRect().y - containerY);
    const mainOffset = Math.abs(mainRef.current.getBoundingClientRect().y - containerY);

    if(bunsOffset < saucesOffset && bunsOffset < mainOffset) setCurrentTab("Булки");
    if(saucesOffset < bunsOffset && saucesOffset < mainOffset) setCurrentTab("Соусы");
    if(mainOffset < bunsOffset && mainOffset < saucesOffset) setCurrentTab("Начинки");
  }

  const ingredients = useSelector(store => store.burgerConstructorReducer.allIngredients);

  const bunArray = React.useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
  const sauceArray = React.useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
  const mainArray = React.useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);

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

        <div className={burgerIngredientsStyles.ingredientsContainer} ref={containerRef} onScroll={handlerScroll}>
          <h2 className="text text_type_main-medium" ref={bunsRef}>Булки</h2>
          <ul className={`${burgerIngredientsStyles.ingredientsGroupList} pt-6 pb-8 pl-4 pr-4`}>
            {bunArray.map((item) => (
              <Link
                to={{
                  pathname: '/ingredients/' + item._id,
                  state: { background: location }
                }}
                className={burgerIngredientsStyles.ingredientListItem}
                key={item._id}
              >
                <li>
                  <IngredientCard
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    type={item.type}
                  />
                </li>
              </Link>
            ))}
          </ul>

          <h2 className="text text_type_main-medium" ref={saucesRef}>Соусы</h2>
          <ul className={`${burgerIngredientsStyles.ingredientsGroupList} pt-6 pb-8 pl-4 pr-4`}>
            {sauceArray.map((item) => (
              <Link
                to={{
                  pathname: '/ingredients/' + item._id,
                  state: { background: location }
                }}
                className={burgerIngredientsStyles.ingredientListItem}
                key={item._id}
              >
                <li>
                  <IngredientCard
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                  />
                </li>
              </Link>
            ))}
          </ul>

          <h2 className="text text_type_main-medium" ref={mainRef}>Начинки</h2>
          <ul className={`${burgerIngredientsStyles.ingredientsGroupList} pt-6 pb-8 pl-4 pr-4`}>
            {mainArray.map((item) => (
              <Link
                to={{
                  pathname: '/ingredients/' + item._id,
                  state: { background: location }
                }}
                className={burgerIngredientsStyles.ingredientListItem}
                key={item._id}
              >
                <li>
                  <IngredientCard
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default BurgerIngredients;
