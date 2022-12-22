import React from 'react';
import PropTypes from 'prop-types';
import ingredientCardStyles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';

const IngredientCard = ( { id, name, price, image } ) => {
  const constructorIngredients = useSelector(store => store.burgerConstructorReducer.constructorIngredients);
  const numInConstructor = constructorIngredients.filter(item => item._id === id).length;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {id}
  });

  return(
    <div className={ingredientCardStyles.ingredientCardItem} ref={dragRef}>
      {(numInConstructor > 0) &&
        <Counter count={numInConstructor} size="default" />
      }
      <img src={image} alt={name} className={ingredientCardStyles.ingredientCardImage} />
      <span className={`${ingredientCardStyles.ingredientCardPrice} text text_type_digits-default`}>
        {price}
        <CurrencyIcon type="primary" />
      </span>
      <p className={`${ingredientCardStyles.ingredientCardName} text text_type_main-default`}>{name}</p>
    </div>
  )
}

IngredientCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}

export default IngredientCard;
