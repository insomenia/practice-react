import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, NavLeft, Link } from 'framework7-react';
import {createAsyncPromise} from '../common/api/api.config';
import { getToken} from '../common/auth';
import {
  atom,
  useRecoilState,
} from 'recoil';

const cartState=atom({
  key:'cartState',
  default:null
});

const Item = (props) => {
  const [itemId,setItemId]=useState(0);
  const [item,setItem]=useState(null);
  const [cart,setCart]=useRecoilState(cartState);
  useEffect(async()=>{
    const data=await createAsyncPromise('GET',`/item/${props.itemId}`)();
    setItem(data.item);
    setItemId(props.itemId);
  },[cart]);
  return (
    <Page>
      <Navbar title={(itemId>0)?item.name:''} sliding={false} backLink='Back'>
      </Navbar>
        {itemId>0
        ? <>
          <p>{item.text}</p>
          <p>찜한 사람들 : {item.likes}</p>
          <p>판매된 갯수 : {item.purchases}</p> 
          <button onClick={()=>{
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
          }}>{item.liked?"이미 좋아요됨":"좋아요"}</button>
          <ul>{item.options.map(option=><li key={option.optionId}>{option.text} : {option.price} {option.inCart
            ?<Link tabLink='#view-carts'>"이미 카트에 있음"</Link>
            :<Link onClick={async ()=>{
              if(getToken().token){
                await createAsyncPromise('POST','/cart')({optionId:option.optionId});
                const newCart=await createAsyncPromise('GET','/cart')();
                setCart(newCart.data);
              }
            }} tabLink='#view-carts'>카트에 넣기</Link>
            }</li>)}</ul>
        </>
        :null}
    </Page>
  );
};

export default Item;
