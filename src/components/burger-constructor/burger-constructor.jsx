import React from "react";
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { REMOVE_INGREDIENT_FROM_CONSTRUCTOR, sendOrder, addIngredientToConstructor, changeIngredientsSort, addBunToConstructor } from '../../services/burgerConstructorActions';

const BurgerConstructor = () => {

  const [isModalActive, setModalActive] = React.useState(false);
  const allIngredients = useSelector(store => store.burgerConstructorReducer.allIngredients);
  const constructorIngredients = useSelector(store => store.burgerConstructorReducer.constructorIngredients);
  const bun = useSelector(store => store.burgerConstructorReducer.constructorBun);
  const dispatch = useDispatch();

  const handlerOrderClick = () => {
    const orderIngredients = constructorIngredients.concat(bun);
    dispatch(sendOrder(orderIngredients));
    setModalActive(true);
  }

  const handleRemoveItem = (constructorId) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: constructorId
    })
  }

  let allCost = constructorIngredients.reduce( (sum, currentItem) => {
    return sum + currentItem.price;
  }, 0);
  if(bun) allCost += 2 * bun.price;

  const handleCloseModal = () => {
    setModalActive(false);
  }

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      const item = allIngredients.find(item => item._id === itemId.id);
      item.type === "bun" ? dispatch(addBunToConstructor(item)) : dispatch(addIngredientToConstructor(item));
    }
  })

  const moveIngredient = (dragIndex, hoverIndex, constructorIngredients) => {
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
          {constructorIngredients.map((item, index) => (
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
            onClick={handlerOrderClick}
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
