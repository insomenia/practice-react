import React,{useEffect,useState} from 'react';
import { Page, Navbar, Block, NavLeft, Link, List, ListItem } from 'framework7-react';
import {createAsyncPromise} from '../common/api/api.config';
import { getToken} from '../common/auth'
import {
  atom,
  useRecoilState,
} from 'recoil';

const cartState=atom({
  key:'cartState',
  default:null
});
const Cart = (props) =>{ 
  const [cart,setCart]=useRecoilState(cartState);
  const getCart=createAsyncPromise('GET','/cart');
  const patchCartSub=createAsyncPromise('PATCH','/cart');
  const deleteCart=async(listItem)=>{
    await createAsyncPromise('DELETE',`/cart/${listItem.optionId}`)();
    const newCart=await getCart();
    setCart(newCart.data);
  };
  const patchCart=async(listItem,quantity)=>{
    if(listItem.quantity===0) deleteCart(listItem);
    else {
      await patchCartSub({optionId:listItem.optionId,quantity});
      const newCart=await getCart();
      setCart(newCart.data)
    }
  };
  useEffect(async()=>{
    if(!getToken().token) return;
    const data=await getCart();
    if(data) setCart(data.data);
  },[])
  return (
    <Page>
      <Navbar sliding={false}>
      </Navbar>
      {cart
      ?(<>
        <ul><List>
          {cart.listItems.map(listItem=><ListItem key={listItem.optionId}>
            <a 
              href={`/item/${listItem.itemId}`}>
              {`${listItem.optionText}, 개당 ${listItem.price}원`}
            </a>
            <div>
              <button onClick={async()=>{
                patchCart(listItem,listItem.quantity+1);
              }}>⬆</button>
              {listItem.quantity}
              <button onClick={async()=>{
                patchCart(listItem,listItem.quantity-1);
              }}>⬇</button>
            </div>
            <div>
              <button onClick={async()=>{
                deleteCart(listItem);
              }}>X</button>
            </div>
          </ListItem>)}
        </List></ul>
        <div>Total : {cart.total}</div>
      </>)
      :null}
      <button>결제</button>
    </Page>
);
};

export default Cart;
