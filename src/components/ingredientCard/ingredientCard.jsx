import React from 'react';
import PropTypes from 'prop-types';
import ingredientCardStyles from './ingredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ( { name, price, image } ) => {
  return(
      <>
        <Counter count={1} size="default" />
        <img src={image} alt={name} className={ingredientCardStyles.ingredientCardImage} />
        <span className={`${ingredientCardStyles.ingredientCardPrice} text text_type_digits-default`}>
            {price}
            <CurrencyIcon type="primary" />
        </span>
        <p className={`${ingredientCardStyles.ingredientCardName} text text_type_main-default`}>{name}</p>
      </>
  )
}

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}

export default IngredientCard;
