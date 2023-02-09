import React, { FC } from 'react';
import ordersDashboardStyles from './orders-dashboard.module.css';
import { useAppSelector } from '../../services/types';
import { TOrder } from '../../services/types';

const OrdersDashboard: FC = () => {

  const { orders, totalOrders, totalOrdersToday } = useAppSelector(store => store.wsReducer);

  const ordersReady = orders.filter((order: TOrder) => order.status === "done").slice(0, 20);
  const ordersInProgress = orders.filter((order: TOrder) => order.status === "pending").slice(0, 20);

  return (
    <div className={ordersDashboardStyles.ordersDashboardContainer}>
      <div className={ordersDashboardStyles.ordersDashboardStatuses}>
        <div className={ordersDashboardStyles.ordersDashboardStatus}>
          <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
          <div className={`${ordersDashboardStyles.ordersDashboardStatusReady} text text_type_digits-default`}>
            <div className={ordersDashboardStyles.orderDashboardNumbers}>
              {ordersReady.map((item: TOrder) => (
                <div key={item._id}>{item.number}</div>
              ))}
            </div>
          </div>
        </div>
        <div className={ordersDashboardStyles.ordersDashboardStatus}>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <div className='text text_type_digits-default'>
            <div className={ordersDashboardStyles.orderDashboardNumbers}>
              {ordersInProgress.map((item: TOrder) => (
                <div key={item._id}>{item.number}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
      <h2 className="text text_type_digits-large">{totalOrders}</h2>
      <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
      <h2 className="text text_type_digits-large">{totalOrdersToday}</h2>
    </div>
  )

}

export default OrdersDashboard;
