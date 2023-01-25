import React, { useState, FC } from "react";
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { sendOrder, addIngredientToConstructor, changeIngredientsSort, addBunToConstructor } from '../../services/action-creators/burgerConstructorActionCreators';
import { useHistory } from 'react-router-dom';
import { TConstructorIngredient, TIngredient } from '../../constants/type-check';
import { useAppDispatch, useAppSelector } from '../../hooks/useForm';
import { burgerConstructorActions } from '../../services/actions/burgerConstructorActions';

const BurgerConstructor: FC = () => {

  const [isModalActive, setModalActive] = useState<boolean>(false);
  const allIngredients = useAppSelector(store => store.burgerConstructorReducer.allIngredients);
  const constructorIngredients = useAppSelector(store => store.burgerConstructorReducer.constructorIngredients);
  const bun = useAppSelector(store => store.burgerConstructorReducer.constructorBun);
  const isAuthenticated = useAppSelector(store => store.userReducer.isAuthenticated);
  const dispatch = useAppDispatch();
  let history = useHistory();

  const handleMakeOrderClick = () => {
    if(!isAuthenticated) {
      history.replace({ pathname: '/login' })
    } else {
      const orderIngredients = constructorIngredients.concat(bun);
      dispatch(sendOrder(orderIngredients));
      setModalActive(true);
    }
  }

  const handleRemoveItem = (constructorId: string) => {
    dispatch({
      type: burgerConstructorActions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: constructorId
    })
  }

  let allCost = constructorIngredients.reduce( (sum: number, currentItem: TIngredient) => {
    return sum + currentItem.price;
  }, 0);

  if(bun) allCost += 2 * bun.price;

  const handleCloseModal = () => {
    setModalActive(false);
  }

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId: any) {
      const item = allIngredients.find((item: TIngredient) => item._id === itemId.id);
      item.type === "bun"
        ? dispatch(addBunToConstructor(item))
        : dispatch(addIngredientToConstructor(item));
    }
  })

  const moveIngredient = (dragIndex: number, hoverIndex: number, constructorIngredients: TConstructorIngredient[]) => {
    dispatch(changeIngredientsSort(dragIndex, hoverIndex, constructorIngredients));
  }

  return(
    <>
      <div className={`${burgerConstructorStyles.burgerConstructorContainer} mt-25 mb-8 `} ref={dropTarget}>
        {bun &&
          <div className="pb-4 pl-5">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        }

        <div className={`${burgerConstructorStyles.burgerConstructorItems} pr-4`}>
          {constructorIngredients.map((item: TConstructorIngredient, index: number) => (
            <div key={item.constructorId} className={burgerConstructorStyles.burgerConstructorItem}>
              <BurgerConstructorElement
                ingredient={item}
                index={index}
                handleClose={() => handleRemoveItem(item.constructorId)}
                moveIngredient={moveIngredient}
              />
            </div>
          ))}
        </div>

        {bun &&
          <div className="pt-4 pl-5">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        }
      </div>

      <div className={burgerConstructorStyles.burgerConstructorOrder}>
        <div className={`${burgerConstructorStyles.burgerConstructorOrderAll} mr-10 `}>
          <p className="text text_type_digits-medium">{allCost}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={burgerConstructorStyles.burgerConstructorOrderSubmit}>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleMakeOrderClick}
            disabled={(constructorIngredients.length === 0 && !bun) ? true : false}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalActive &&
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      }
    </>
  )
}

export default BurgerConstructor