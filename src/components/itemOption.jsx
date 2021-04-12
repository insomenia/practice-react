import React, { useState } from "react";
import { Sheet, Toolbar } from "framework7-react";
import { cartReadyState } from "../js/atoms";
import { useRecoilState } from "recoil";
import CartReadyList from "./cartReadyList";
import SelectOption from "./selectOption";

const ItemOption = (props) => {
  const [cartReady, setCartReady] = useRecoilState(cartReadyState);
  const [sheetOpened, setSheetOpened] = useState(false);

  return (
    <Sheet
      className="option-sheet"
      closeByOutsideClick
      opened={sheetOpened}
      onSheetClosed={() => setSheetOpened(false)}>
      <Toolbar />
      <SelectOption></SelectOption>
      <CartReadyList {...{cartReady, setCartReady}}></CartReadyList>
    </Sheet>
  );
};

export default ItemOption;
