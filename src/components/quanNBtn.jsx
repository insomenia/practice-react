import React, { useEffect } from "react";
import {
  f7,
  Page,
  Navbar,
  List,
  ListItem,
  Button,
  Row,
  Col,
  Icon,
} from "framework7-react";

const QuanNBtn = ({ index, array, handleQuantity, handleDelete }) => {

  return (
    <Row noGap className='items-center'>
      <Col width="20">
        <button onClick={() => handleQuantity(index, array[index].quantity - 1)}>
          <Icon f7="chevron_left" color="#3b20d4f3" className="text-sm mb-2" />
        </button>
      </Col>
      <Col width="30" className="border-2">
        <input type="number" min="1" className="text-center w-full"
          onChange={(event) => handleQuantity(index, event.target.value)}
          value={array[index].quantity || ""}
        />
      </Col>
      <Col width="20" className="flex-row items-center">
        <button onClick={() => handleQuantity(index, array[index].quantity + 1)}>
          <Icon f7="chevron_right" color="#3b20d4f3" className="text-sm mb-2" />
        </button>
      </Col>
      <Col width="30" className="p-1">
        <button onClick={() => handleDelete(index)}
          className="h-full bg-indigo-600 bold text-white"
        >
          X
      </button>
      </Col>
    </Row>
  );
};

export default QuanNBtn;
