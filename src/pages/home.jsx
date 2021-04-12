import {
  Block,
  BlockTitle,
  Button,
  Col,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Row,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { createAsyncPromise } from "../common/api/api.config";

const HomePage = (props) => {
  const [categoryId, setCategoryId] = useState(-1);
  const [items, setItems] = useState([]);
  useEffect(async () => {
    const getItems = createAsyncPromise(
      "GET",
      props.categoryId ? `/items/${props.categoryId}` : "/items"
    );
    const data = await getItems();
    setItems(data.items);
    setCategoryId(props.categoryId || 0);
  }, []);
  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar className="text-center " sliding={false}>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        Insomenia Shop
        <NavRight className="w-10"> </NavRight>
      </Navbar>
      {/* Page content */}
      <div className="flex justify-center">
        <img
          src={`https://insomenia.com/svgs/artificial`}
          alt=""
          className="w-full md:w-72"
        />
      </div>
      <div className="p-3 grid grid-cols-2 md:grid-cols-8 justify-items-center">
        {/*<List mediaList>*/}
        {categoryId >= 0
          ? items.map((item, index) => (
              <a
                key={item.itemId}
                href={`/item/${item.itemId}`}
                className="w-36 text-center text-base border border-black mt-5 mx-1"
              >
                <Row>
                  <Col>
                    <img
                      src={`http://localhost:3000/img/small/${item.name}`}
                      className="w-full h-full border-b"
                    />
                  </Col>
                </Row>
                <Row className="text-lg border-b">
                  <Col>{item.name}</Col>
                </Row>
                <Row>
                  <Col width="60">찜</Col>
                  <Col width="40">{item.likes}</Col>
                </Row>
                <Row>
                  <Col width="60">판매량</Col>
                  <Col width="40">{item.purchases}</Col>
                </Row>
                <Row className="border-t">
                  <Col>
                    {item.minPrice}원 ~ {item.maxPrice}원
                  </Col>
                </Row>
              </a>
            ))
          : null}
        {/*</List>*/}
      </div>
    </Page>
  );
};
export default HomePage;
