import React, { useState, useEffect } from "react";
import { Page, Navbar, Row, Col } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { cartState } from "../js/atoms";
import ItemDesc from "../components/itemDesc";
import ItemOption from "../components/itemOption";

const Item = (props) => {
  const [itemId, setItemId] = useState(0);
  const [item, setItem] = useState(null);
  const [cart, setCart] = useRecoilState(cartState);

  useEffect(async () => {
    const data = await createAsyncPromise("GET", `/item/${props.itemId}`)();
    setItem(data.item);
    setItemId(props.itemId);
  }, [cart]);

  return (
    <Page noToolbar>
      <Navbar
        title={itemId > 0 ? item.name : ""}
        sliding={false}
        backLink="Back"
      ></Navbar>
      {itemId > 0 ? (
        <div className="text-center text-base md:grid md:grid-cols-4 md:mt-20">
          <div className="md:col-start-2 md:col-span-1">
            <Row className="flex-col items-center pb-5">
              <Col width="80">
                <img
                  src={`http://localhost:3000/img/big/${item.name}`}
                  className="w-full border"
                />
              </Col>
            </Row>
          </div>
          <div className="md:col-end-4 md:col-span-1">
            <ItemDesc itemId={itemId} setItem={setItem} item={item}></ItemDesc>

            <ItemOption item={item}></ItemOption>
          </div>
        </div>
      ) : null}
    </Page>
  );
};

export default Item;
