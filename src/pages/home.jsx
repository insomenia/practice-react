import {
  Block,
  BlockTitle,
  Button, Col, Link,
  List,
  ListItem, Navbar,
  NavLeft,
  NavTitle, Page,
  Row
} from 'framework7-react';
import React,{useState, useEffect} from 'react';
import {createAsyncPromise} from '../common/api/api.config';


const HomePage = (props) => {
  const [categoryId,setCategoryId]=useState(-1);
  const [items,setItems]=useState([]);
  useEffect(async()=>{
    const getItems=createAsyncPromise('GET',props.categoryId?`/items/${props.categoryId}`:'/items');
    const data=await getItems();
    setItems(data.items);
    setCategoryId(props.categoryId||0);
  },[]);
  return <Page name="home">
      {/* Top Navbar */}
      <Navbar sliding={false}>
        <NavLeft>
          <Link icon='las la-bars' panelOpen="left" />
        </NavLeft>
      </Navbar>
      {/* Page content */}
      <div className="p-3 grid grid-cols-2 justify-items-center">
        {/*<List mediaList>*/}
        {categoryId>=0
        ?items.map((item,index)=>
        /*<ListItem
          key={item.itemId}
          link={`/item/${item.itemId}`}
          title={item.name}
          subtitle={`찜:${item.likes} 판매량:${item.purchases}`}
          text={`${item.minPrice}원 ~ ${item.maxPrice}원`}>
        <img slot='media' src={`http://localhost:3000/img/small/${item.name}`} className='w-32 h-32 border border-gray'/>
        </ListItem>*/
          <a key={item.itemId} href={`/item/${item.itemId}`} className='w-full text-center text-base border pt-5'>
            <Row>
              <Col>
                <img src={`http://localhost:3000/img/small/${item.name}`} className='w-full h-full border-b'/>
              </Col>
            </Row>
            <Row className='text-lg border-b'>
              <Col>{item.name}</Col>
            </Row>
            <Row>
              <Col width='60'>찜</Col>
              <Col width='40'>{item.likes}</Col>
            </Row>
            <Row>
              <Col width='60'>판매량</Col>
              <Col width='40'>{item.purchases}</Col>
            </Row>
            <Row className='border-t'>
              <Col>{item.minPrice}원 ~ {item.maxPrice}원</Col>
            </Row>
          </a>
        )
        :null}
        {/*</List>*/}
      </div>

    </Page>
  };
export default HomePage;