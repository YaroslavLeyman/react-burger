/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import orderDetailsStyles from './orderDetails.module.css';
import iconOrder from '../../images/iconOrder.svg';

const OrderDetails = () => {

  return (
      <div className={`${orderDetailsStyles.orderDetailsContainer} pt-30 pb-30`}>
          <h2 className="text text_type_digits-large mb-8">034536</h2>
          <span className="text text_type_main-medium">идентификатор заказа</span>
          <img src={iconOrder} className="mt-15 mb-15" />
          <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
          <span className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
      </div>
  )

}

export default OrderDetails;
