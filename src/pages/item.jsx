import React, {useState, useEffect} from 'react';
import { Page, Navbar, Button, Block, NavLeft, Link, Row, Col, Icon, Sheet, Toolbar } from 'framework7-react';
import {createAsyncPromise} from '../common/api/api.config';
import { getToken} from '../common/auth';
import {
  atom,
  useRecoilState,
} from 'recoil';
import {cartState} from '../js/atoms';

const Item = (props) => {
  const [itemId,setItemId]=useState(0);
  const [item,setItem]=useState(null);
  const [cart,setCart]=useRecoilState(cartState);
  const [sheetOpened,setSheetOpened]=useState(false);
  useEffect(async()=>{
    const data=await createAsyncPromise('GET',`/item/${props.itemId}`)();
    setItem(data.item);
    setItemId(props.itemId);
  },[cart]);
  return (
    <Page noToolbar>
      <Navbar title={(itemId>0)?item.name:''} sliding={false} backLink='Back'>
      </Navbar>
        {itemId>0
        ?
        <div className='text-center text-base'>
          <Row className='flex-col items-center pb-10'>
            <Col width='80'>
              <img src={`http://localhost:3000/img/big/${item.name}`} className='w-full border'/>
            </Col>
          </Row>    

          <Row noGap className='items-stretch pb-10 m-10'>
            <Col width='50'>
              <Button className='h-full' fill sheetOpen='.option-sheet' >옵션</Button>
            </Col>
            <Col width='50'>
              <Row>
                <Col width='50'>찜 : {item.likes}</Col>
                <Col width='50'>판매량 : {item.purchases}</Col>
              </Row>
              <Row>
                <Col onClick={()=>{
                  if(getToken().token){
                    if(!item.liked){
                      createAsyncPromise('POST','/like')({itemId});
                      setItem({...item,likes:item.likes+1,liked:true});
                    }
                    else{
                      createAsyncPromise('DELETE',`/like/${itemId}`)();
                      setItem({...item,likes:item.likes-1,liked:false});
                    }
                  }
                }}>
                  <Icon f7={!item.liked?'hand_thumbsup':'hand_thumbsup_fill'} color='green'></Icon>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <p>{item.text}</p>
          <Sheet className='option-sheet' closeByOutsideClick opened={sheetOpened}
            onSheetClosed={()=>setSheetOpened(false)}>
            <Toolbar>
              <div className='left w-full ml-8 mr-5'>
                <Row className='w-full text-center'>
                  <Col width='30'>옵션</Col>
                  <Col width='30'>가격</Col>
                  <Col width='40'></Col>
                </Row>
              </div>
              <div className='right'>
                <Link sheetClose>X</Link>
              </div>
            </Toolbar>
            <ul className='mx-10'>
              {item.options.map(option=><li key={option.optionId}>
                <Row className='w-full text-center text-base'>
                  <Col width='30'>{option.text}</Col> 
                  <Col width='30'>{option.price}</Col>
                  <Col width='40'>{!getToken().token
                  ?<Link href='/users/sign_in/' sheetClose>
                    로그인하기
                  </Link>
                  :<Link sheetClose onClick={async ()=>{
                    if(!option.inCart){
                      await createAsyncPromise('POST','/cart')({optionId:option.optionId});
                      const newCart=await createAsyncPromise('GET','/cart')();
                        setCart(newCart.data);
                    }
                  }}>카트에 {option.inCart?"있음":"넣기"}</Link>
                  }</Col>
                </Row>
              </li>)}
            </ul>
          </Sheet>
        </div>
        :null}
    </Page>
  );
};

export default Item;
