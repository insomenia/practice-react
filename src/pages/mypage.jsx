import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, List, ListItem, Row, Col } from 'framework7-react';
import {createAsyncPromise} from '../common/api/api.config';
import { useRecoilState} from 'recoil';
import {myInfoState} from '../js/atoms';

const MyPage = () =>{
  const [info,setInfo]=useRecoilState(myInfoState);
  const [myOrders,setMyOrders]=useState(null);
  const getMypage=createAsyncPromise('GET','/myinfo');
  const getMyOrders=createAsyncPromise('GET','/myorders');
  useEffect(async()=>{
    const infoPromise=getMypage();
    const ordersPromise=getMyOrders();
    setInfo(await infoPromise);
    setMyOrders((await ordersPromise).orders);
  },[])
  return(
    <Page noToolbar>
      <Navbar title="Mypage" backLink="Back" />
      {(!info)
        ?null
        :<div className='text-base pl-10'>
          <Row> <Col width='30'>주소</Col> <Col width='70'>{info.address}</Col></Row>
          <Row> <Col width='30'>전화번호</Col> <Col width='70'>{info.phone}</Col></Row>
        </div>
      }
      <ul><List>
      {
        (myOrders===null)
        ?null
        :(myOrders.length===0)
          ?"주문내역이 없습니다."
          :myOrders.map(order=><ListItem key={order.orderId} href={`/users/my_orders/${order.orderId}`}>
              <Row className='w-full'>
                <Col width='80'>{order.summary.length>20?`${order.summary.slice(0,18)}...`:order.summary}</Col>
                <Col width='20' className='text-center'>{order.state}</Col>
              </Row>
          </ListItem>)
      }
      </List></ul>
    </Page>
  );
}

export default MyPage;
