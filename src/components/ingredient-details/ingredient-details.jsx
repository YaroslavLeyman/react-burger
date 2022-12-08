/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { ingredientType } from '../../constants/type-check';

const IngredientDetails = ( { ingredientData } ) => {

  const { name, calories, fat, carbohydrates, proteins, image_large } = ingredientData;

  return (
    <>
      <div className={`${ingredientDetailsStyles.ingredientDetailsContainer} pb-15`}>
        <img src={image_large} alt={ingredientData.name} />
        <span className={`${ingredientDetailsStyles.ingredientDetailsName} text text_type_main-medium mt-4`}>{name}</span>
        <div className={`${ingredientDetailsStyles.ingredientDetailsItems} mt-8`}>
          <div className={ingredientDetailsStyles.ingredientDetailsItem}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_main-default text_color_inactive">{calories}</p>
          </div>
          <div className={ingredientDetailsStyles.ingredientDetailsItem}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_main-default text_color_inactive">{proteins}</p>
          </div>
          <div className={ingredientDetailsStyles.ingredientDetailsItem}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_main-default text_color_inactive">{fat}</p>
          </div>
          <div className={ingredientDetailsStyles.ingredientDetailsItem}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_main-default text_color_inactive">{carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  ingredientData: PropTypes.shape(ingredientType).isRequired
}

export default IngredientDetails;
