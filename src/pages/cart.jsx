import React, { useEffect } from "react";
import {
  Page,
  Navbar,
  List,
  ListItem,
  Button,
  Row,
  Col,
  Icon,
} from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { getToken } from "../common/auth";
import { useRecoilState } from "recoil";
import { cartState } from "../js/atoms";

const Cart = (props) => {
  const [cart, setCart] = useRecoilState(cartState);
  const getCart = createAsyncPromise("GET", "/cart");
  const patchCartSub = createAsyncPromise("PATCH", "/cart");
  const deleteCart = async (listItem) => {
    await createAsyncPromise("DELETE", `/cart/${listItem.optionId}`)();
    const newCart = await getCart();
    setCart(newCart.data);
  };
  const patchCart = async (listItem, quantity) => {
    if (quantity === "") quantity = 0;
    await patchCartSub({ optionId: listItem.optionId, quantity });
    const newCart = await getCart();
    setCart(newCart.data);
  };
  useEffect(async () => {
    if (!getToken().token) return;
    const data = await getCart();
    if (data) setCart(data.data);
  }, []);
  return (
    <Page>
      <Navbar sliding={false}></Navbar>
      {cart && cart.listItems.length > 0 ? (
        <ul>
          <List>
            {cart.listItems.map((listItem) => (
              <ListItem key={listItem.optionId}>
                <Row noGap className="w-full text-center items-center">
                  <Col width="75">
                    {
                      //<a href={`/item/${listItem.itemId}`}>
                      <Row className="items-center">
                        <Col>
                          <img
                            src={`http://localhost:3000/img/small/${listItem.itemName}`}
                            className="w-full md:w-20 border"
                          />
                        </Col>
                        <Col>{listItem.itemName}</Col>
                        <Col>{listItem.optionText}</Col>
                        <Col>{listItem.price}</Col>
                      </Row>
                      //</a>
                    }
                  </Col>
                  <Col width="15">
                    <Row>
                      <Col>
                        <button
                          onClick={async () => {
                            patchCart(listItem, listItem.quantity + 1);
                          }}
                        >
                          <Icon
                            f7="chevron_up"
                            className="text-sm"
                            color="#3b20d4f3"
                          />
                        </button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="border-2">
                        <input
                          type="number"
                          min="1"
                          className="text-center w-full "
                          onChange={(event) => {
                            patchCart(listItem, event.target.value);
                          }}
                          value={listItem.quantity || ""}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button
                          onClick={async () => {
                            if (listItem.quantity === 1 || !listItem.quantity)
                              return;
                            patchCart(listItem, listItem.quantity - 1);
                          }}
                        >
                          <Icon
                            f7="chevron_down"
                            className="text-sm mb-4"
                            color="#3b20d4f3"
                          />
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Col width="10">
                    <button
                      onClick={async () => {
                        deleteCart(listItem);
                      }}
                      className="w-5 bg-indigo-600 bold text-white"
                    >
                      X
                    </button>
                  </Col>
                </Row>
              </ListItem>
            ))}
            <Row className>
              <Col width="50"></Col>
              <Col width="50" className="flex justify-center">
                <Button
                  className="border pace- text-black text-base mt-10 w-40"
                  href="/purchase/"
                >
                  {cart.total}원 결제
                </Button>
              </Col>
            </Row>
          </List>
        </ul>
      ) : (
        <div>카트가 비어있습니다.</div>
      )}
    </Page>
  );
};

export default Cart;
