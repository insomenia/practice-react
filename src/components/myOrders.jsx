import React, { useState, useEffect } from "react";
import { List, ListItem, Row, Col } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState(null);
  const getMyOrders = createAsyncPromise("GET", "/myorders");
  useEffect(async () => {
    const orders = await getMyOrders();
    setMyOrders(orders.orders);
  }, []);
  return (
    <>
      <b className='text-xl ml-5'>내 주문 내역</b>
      <ul className="px-5 -mt-7">
        <List>
          {myOrders === null
            ? null
            : myOrders.length === 0
              ? "주문내역이 없습니다."
              : myOrders.map((order) => (
                <ListItem
                  key={order.orderId}
                  href={`/users/my_orders/${order.orderId}/`}
                  className='border-b'
                >
                  <Row className="w-full">
                    <Col width='50'>
                      <img src={`http://localhost:3000/img/small/${order.summary.split(' ')[0]}`} />
                    </Col>
                    <Col width="50" className="flex flex-col items-end">
                      <div>{order.summary}</div>
                      <div>{order.state}</div>
                      <div className='text-sm'>{order.total}원</div>
                    </Col>
                  </Row>
                </ListItem>
              ))
          }
        </List>
      </ul>
    </>
  );
};

export default MyOrders;
