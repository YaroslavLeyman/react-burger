import React from "react";
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../constants/type-check';

const BurgerConstructor = ({ ingredients }) => {

  const [isModalActive, setModalActive] = React.useState(false);

  const [constructorBun ] = React.useState("60d3b41abdacab0026a733c6");

  const bun = ingredients.find((item) => item._id === constructorBun);

  return(
    <>
      <div className={`${burgerConstructorStyles.burgerConstructorContainer} mt-25 mb-8 `}>
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
          {ingredients
          .filter(item => item.type !== "bun")
          .map((item, index) => (
            <div key={index} className={burgerConstructorStyles.burgerConstructorItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
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
          <p className="text text_type_digits-medium">6431</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={burgerConstructorStyles.burgerConstructorOrderSubmit}>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => setModalActive(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalActive &&
        <Modal onClose={() => setModalActive(false)}>
          <OrderDetails />
        </Modal>
      }
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired
}

export default BurgerConstructor;
