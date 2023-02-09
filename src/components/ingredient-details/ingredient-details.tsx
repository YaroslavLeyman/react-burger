/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { TIngredient, useAppSelector, TParams } from '../../services/types/index';

const IngredientDetails: FC = () => {

  const { id } = useParams<TParams>();
  const allIngredients = useAppSelector(store => store.burgerConstructorReducer.allIngredients);
  const currentIngredient = allIngredients.find((item: TIngredient) => item._id === id);

  if(!currentIngredient) {
    return null;
  }

  return (
    <>
      <div className={`${ingredientDetailsStyles.ingredientDetailsContainer} pb-15`}>
        <img src={currentIngredient.image_large} alt={currentIngredient.name} />
        <span className={`${ingredientDetailsStyles.ingredientDetailsName} text text_type_main-medium mt-4`}>{currentIngredient.name}</span>
        <div className={`${ingredientDetailsStyles.ingredientDetailsItems} mt-8`}>
          <div className={ingredientDetailsStyles.ingredientDetailsItem}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_main-default text_color_inactive">{currentIngredient.calories}</p>
          </div>
          <div className={ingredientDetailsStyles.ingredientDetailsItem}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_main-default text_color_inactive">{currentIngredient.proteins}</p>
          </div>
          <div className={ingredientDetailsStyles.ingredientDetailsItem}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_main-default text_color_inactive">{currentIngredient.fat}</p>
          </div>
          <div className={ingredientDetailsStyles.ingredientDetailsItem}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_main-default text_color_inactive">{currentIngredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default IngredientDetails;
