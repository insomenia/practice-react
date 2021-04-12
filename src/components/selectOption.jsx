import React from "react";
import { f7 } from "framework7-react";
import { getToken } from "../common/auth";
import { cartReadyState, itemState } from "../js/atoms";
import { useRecoilState } from "recoil";

const SelectOption = (props) => {
  const [cartReady, setCartReady] = useRecoilState(cartReadyState);
  const [item,] = useRecoilState(itemState);

  const handleChange = (e) => {
    const index = e.target.value;
    if(index === '-1') return;
    const options = item.options;
    if (!getToken().token) {
      f7.dialog.alert("로그인이 필요합니다.", "회원 전용");
      return;
    }
    if (
      cartReady.some(
        (optionInList) =>
          optionInList.optionId === options[index].optionId
      )
    ) {
      f7.dialog.alert("이미 선택하신 상품입니다.", "이미 있음");
      return;
    } else if (options[index].inCart) {
      f7.dialog.alert(
        "이미 카트에 담긴 상품입니다.",
        "이미 있음"
      );
      return;
    } else
      setCartReady([...cartReady, { ...options[index], quantity: 1 }]);
  };

  return (
    <select className="w-full border-gray text-base text-center" onChange={handleChange}>
      <option value={-1}>옵션을 선택하세요.</option>
      {item.options.map((option, index) => (
        <option value={index} key={option.optionId}>{option.text} : {option.price}원
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
