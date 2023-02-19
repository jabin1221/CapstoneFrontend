import React, { useRef, useState } from 'react';
import Item from './Item';
import styled from 'styled-components';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BasicMac from '../../assets/items/basicMac.jpg';
import BasicMac2 from '../../assets/items/basicMac2.jpg';
import MacM1Air from '../../assets/items/macM1Air.jpg';
import MacM1Pro from '../../assets/items/macM1Pro.jpg';
import MacM2Air from '../../assets/items/macM2Air.jpg';
import MacM2Pro from '../../assets/items/macM2Pro.jpg';
import { useImmer } from 'use-immer';

const ItemList = (props) => {
  const [searched, setSearched] = useState("");
  const inputRef = useRef();

  const [items, setItems] = useImmer({
    data: [
      {
        name: "Macbook i7",
        writer: "이성진 님",
        content: "맥북 i7 판매합니다.",
        address: "경기도 수원시",
        price: 1100000,
        url: BasicMac,
        pop: 20,
      },
      {
        name: "Macbook i7 16년도형",
        writer: "조규환 님",
        content: "맥북 i7 16년도 모델팝니다.",
        address: "경기도 안산시",
        price: 700000,
        url: BasicMac2,
        pop: 15,
      },
      {
        name: "Mac M1 Air",
        writer: "이민정 님",
        content: "맥북 M1 Air 새상품 팝니다.",
        address: "경기도 안산시",
        price: 1250000,
        url: MacM1Air,
        pop: 10,
      },
      {
        name: "Mac M1 Pro",
        writer: "김성진 님",
        content: "맥북 M1 Pro 새상품 팝니다.",
        address: "경기도 성남시",
        price: 1400000,
        url: MacM1Pro,
        pop: 100,
      },
      {
        name: "Mac M2 Air",
        writer: "김수지 님",
        content: "맥북 M2 Air 새상품 팝니다.",
        address: "경기도 용인시",
        price: 1200000,
        url: MacM2Air,
        pop: 120,
      },
      {
        name: "Mac M2 Pro",
        writer: "홍길동 님",
        content: "맥북 M2 Pro 새상품 팝니다.",
        address: "경기도 안산시",
        price: 1700000,
        url: MacM2Pro,
        pop: 200
      }
    ]
  });

  const onSetSearched = e => {
    e.preventDefault();
    setSearched(inputRef.current.value);
  };

  const onSetSolt = e => {
    console.log(e.target.id);
    switch (e.target.id) {
      /* 인기순 */
      case "pop": 
        setItems(draft => {
          draft.data = [...items.data].sort((a, b) => b.pop - a.pop);
        });
        break;
      /* 가격 낮은순 */
      case "desc":
        setItems(draft => {
          draft.data = [...items.data].sort((a, b) => a.price - b.price);
        });
        break;
      /* 가격 높은순 */
      case "asc":
        setItems(draft => {
          draft.data = [...items.data].sort((a, b) => b.price - a.price);
        });
        break;
      default: 
        return;
    }
  };

  return (
    <StyledContainer>
      <StyledFlex>
        <h1>판매상품</h1>
        <StyledSearchForm onSubmit={(e) => onSetSearched(e)}>
          <input type="text" ref={inputRef} />
          <button onClick={onSetSearched}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </StyledSearchForm>
        <StyledSoltContainer>
          <StyledSoltWrapper>
            <input type="radio" name="solt" id="pop" onChange={onSetSolt} />
            <label htmlFor="pop">인기순</label>
          </StyledSoltWrapper>
          <StyledSoltWrapper>
            <input type="radio" name="solt" id="desc" onChange={onSetSolt} />
            <label htmlFor="desc">가격 낮은순</label>  
          </StyledSoltWrapper>
          <StyledSoltWrapper>
            <input type="radio" name="solt" id="asc" onChange={onSetSolt} />
            <label htmlFor="asc">가격 높은순</label>  
          </StyledSoltWrapper>
        </StyledSoltContainer>
      </StyledFlex>
      <StyledWrapper>
        {searched.length > 0
          ? items?.data.map((v, idx) => {
              if (v.content.includes(searched)) {
                return (
                  <Item key={idx} data={v} searched={searched} />
                )
              }
            })
          : items?.data.map(v => <Item data={v} searched={searched} />)
        }
      </StyledWrapper>
    </StyledContainer>
  )    
};

const StyledFlex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  h1 {
    margin-bottom: 20px;
    text-align: left;
    font-size: 26px;
    font-weight: 500;
  }
`;

const StyledSearchForm = styled.form`
  position: absolute;
  top: 0;
  right: 0%;
  transform: translate(-100%, 0%);
  display: flex;
  align-items: center;
  width: 600px;
  input {
    width: 100%;
    padding-left: 12px;
    border: 1px solid lightgrey;
    height: 35px;
    outline: none;
  }
  button {
    background-color: whitesmoke;
    border: 1px solid lightgrey;
    width: 35px;
    height: 35px;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    background-color: #d3d3d3;
  }
`;

const StyledSoltContainer = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledSoltWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  label {
    font-size: 18px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 20px 40px;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

export default ItemList;