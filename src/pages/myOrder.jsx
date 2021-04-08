import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, List, ListItem, Row, Col } from 'framework7-react';
import {createAsyncPromise} from '../common/api/api.config';

const MyOrder = (props) => {
  const [myOrder,setMyOrder]=useState(null);
  const getMyOrder=createAsyncPromise('GET',`/myorder/${props.orderId}`);
  useEffect(async()=>{
    const data=await getMyOrder();
    setMyOrder(data.order);
  },[])
  return (
    <Page noToolbar>
      <Navbar title="my order" backLink="Back" />
      {(!myOrder)
        ?null
        :<div className='text-center'>
          <Row>
            <Col>주문번호:</Col>
            <Col>{myOrder.orderId}</Col>
          </Row>
          <Row>
            <Col>주문상태:</Col>
            <Col>{myOrder.state}</Col>
          </Row>
          <Row>
            <Col>결제금액:</Col>
            <Col>{myOrder.total}</Col>
          </Row>
          <ul><List>
            <ListItem>
              <Row noGap className='w-full text-center pr-5'>
                <Col width='25'></Col>
                <Col width='25'></Col>
                <Col width='25'>개당가격</Col> 
                <Col width='25'>수량</Col>
              </Row>
            </ListItem>
            {myOrder.listItems.map(listItem=><ListItem key={listItem.optionId}
                href={`/item/${listItem.itemId}`}>
                <Row noGap className='w-full text-center items-center'>
                  <Col width='25'>
                    <img src={`http://localhost:3000/img/small/${listItem.itemName}`} className='w-full'/>
                  </Col>
                  <Col width='25'>
                    <Row>
                      <Col>{listItem.itemName}</Col>
                    </Row>
                    <Row>
                      <Col>{listItem.optionText}</Col>
                    </Row>
                  </Col>
                  <Col width='25'>{listItem.price}</Col> 
                  <Col width='25'>{listItem.quantity}</Col>
                </Row>
            </ListItem>
            )}
          </List></ul>
        </div>
      }
    </Page>
  );
};

export default MyOrder;
