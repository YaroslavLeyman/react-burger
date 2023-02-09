import React, { FC, useEffect } from 'react';
import orderInfoStyles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { getOrderInfo } from '../../services/action-creators/burgerConstructorActionCreators';
import { TParams, TIngredient, TOrderIngredient } from '../../services/types';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {

  const dispatch = useAppDispatch();

  const { number } = useParams<TParams>();

  useEffect(() => {
    dispatch(getOrderInfo(String(number)));
  }, [dispatch, number])

  const { currentOrder } = useAppSelector(store => store.burgerConstructorReducer);
  const { allIngredients } = useAppSelector(store => store.burgerConstructorReducer);

  let orderIngredients: TOrderIngredient[] = [];
  currentOrder?.ingredients.forEach((currentItem) => {
    let currentIngredient = allIngredients.find((item: TIngredient) => item._id === currentItem);
    if (currentIngredient) {
      if (orderIngredients.find(item => item._id === currentIngredient?._id) === undefined) {
        let q = currentOrder?.ingredients.filter(item => item === currentIngredient?._id).length;
        orderIngredients.push({...currentIngredient, quantityInOrder: q});
      }
    }
  });

  let orderSum = orderIngredients.reduce((sum, currentItem) => {
    return sum + (currentItem.price * currentItem.quantityInOrder);
  }, 0);

  const formatStatus = (status: string | undefined) => {
    switch (status) {
      case "created":
        return "Создан";
      case "pending":
        return "Готовится";
      case "done":
        return "Выполнен";
      default:
        return "Неизвестен";
    }
  }

  return (
    <div className={orderInfoStyles.orderInfoContainer}>
      <div className={`${orderInfoStyles.ordersInfoHeading} text text_type_digits-default mb-10`}>#{currentOrder?.number}</div>
      <div className="text text_type_main-medium mb-3">{currentOrder?.name}</div>
      <div className={`${orderInfoStyles.orderInfoStatus} text text_type_main-default mb-15`}>{formatStatus(currentOrder?.status)}</div>
      <div className="text text_type_main-medium mb-6">Состав:</div>
      <div className={`${orderInfoStyles.orderInfoIngredientsContainer} mb-10 pr-6`}>

      {orderIngredients.map(item => (
        <div className={orderInfoStyles.orderInfoIngredient} key={item._id}>
          <div className={orderInfoStyles.orderInfoIngredientPreview}>
            <img src={item.image} className={orderInfoStyles.orderInfoIngredientPreviewImage} alt={item.name} />
          </div>
          <div className={`${orderInfoStyles.orderInfoIngredientNameBlock} text text_type_main-default`}>
            <p className={orderInfoStyles.orderInfoIngredientName}>
              {item.name}
            </p>
          </div>
          <div className={orderInfoStyles.orderInfoIngredientTotal}>
            <div className="text text_type_digits-default">{item.quantityInOrder} x {item.price}</div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      ))}

      </div>
      <div className={orderInfoStyles.ordersInfoBottom}>
        <div className="text text_type_main-default text_color_inactive">
          {currentOrder &&
            <FormattedDate date={new Date(currentOrder.updatedAt)} />
          }
        </div>
        <div className={orderInfoStyles.orderInfoIngredientTotal}>
          <div className="text text_type_digits-default">{orderSum}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )

}

export default OrderInfo;
