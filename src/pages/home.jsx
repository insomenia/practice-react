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
      <div className="p-3">
        <List mediaList>
        {categoryId>=0
        ?items.map((item,index)=>
        <ListItem
          key={item.itemId}
          link={`/item/${item.itemId}`}
          title={item.name}
          subtitle={`찜:${item.likes} 판매량:${item.purchases}`}
          text={`${item.minPrice}원 ~ ${item.maxPrice}원`}>
          <img slot='media' src={`http://localhost:3000/img/small/${item.name}`} className='w-40 h-40 border border-gray'/>
        </ListItem>
          /*<a key={item.itemId} href={`/item/${item.itemId}`}>
            <Row noGap className={`text-center text-base border-b border-r border-l border-gray${index===0?' border-t':''} items-stretch`}>
              <Col width="30" className="border border-gray">
                <img src={`http://localhost:3000/img/small/${item.name}`} className='w-full h-full border-r border-gray'/>
              </Col>
              <Col width="70" className="border border-gray">
                <Row className='items-center h-12'>
                  <Col width='50'>{item.name}</Col>
                  <Col width='20'>
                    <Row><Col>찜</Col></Row>
                    <Row><Col>{item.likes}</Col></Row>
                  </Col>
                  <Col width='30'>
                    <Row><Col>판매량</Col></Row>
                    <Row><Col>{item.purchases}</Col></Row>
                  </Col>
                </Row>
                <Row className='border h-20 items-center'>
                  <Col>{item.minPrice}-{item.maxPrice}</Col>
                </Row>
              </Col>
            </Row>
          </a>*/
        )
        :null}
        </List>
      </div>

    </Page>
  };
export default HomePage;