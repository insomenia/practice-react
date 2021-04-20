import React from "react";
import { Col, Row, Link, Icon } from "framework7-react";
import Bookmark from "./bookmark";

function ItemInList({ items, setItems }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 justify-items-center">
      {items.map((item, index) => (
        <div key={item.itemId}
          className="text-base m-1 border border-b-4 border-r-4 rounded-xl p-3">
          <Row className='justify-between '>
            <Col>{item.grade > 0 && <><Icon f7='star_filled' color='yellow' /> {item.grade.toFixed(1)}</>}</Col>
            <Col width='30' className='flex flex-row'>{item.likes > 0 && item.likes}<Bookmark item={item} setItem={(newItem) => {
              setItems([...items.slice(0, index), newItem, ...items.slice(index + 1)]);
            }} /></Col>
          </Row>
          <Link
            className='flex flex-col'
            href={`/item/${item.itemId}`}
          ><Row>
              <Col className='h-40 p-3 border-b'>
                <img
                  src={`http://localhost:3000/img/small/${item.name}`}
                  className="w-full h-full"
                />
              </Col>
            </Row>
            <Row className="text font-me justify-between">
              <Col width='100'>{item.name}</Col>
            </Row>
            <Row>
              <Col className='text-sm'><b>
                {
                  item.minPrice === item.maxPrice
                    ? `${item.minPrice}원`
                    : `${item.minPrice}원 ~ ${item.maxPrice}원`
                }
              </b></Col>
            </Row>
          </Link>
        </div>
      ))
      }</div >);
}

export default ItemInList;