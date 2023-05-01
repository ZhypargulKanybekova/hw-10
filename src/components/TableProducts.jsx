import React from "react";
import styled from "styled-components";
import { productsData } from "../utils/Constans";
import {useContextStore} from "./StoreContext"
export const TableProducts = (
) => {
  const { store= [],
    incProduct,
    decProduct,
    removeProduct}=useContextStore()

  const totalPrice = store?.product.map((item)=>{
    if ( item.quantiti === 0){
        const result={...item, price : (item.price = 0)}
        return result.price
    }else{
        return item.price
    }
  } )
  const resultTotal = totalPrice.reduce((a, b) => a + b, 0);
  return (
    <Container>
      <div>
        <Table>
          <Thead>
            {/* <p className="id">#</p> */}
            <p>Iphone</p>
            <p>Модель</p>
            <p>Цена</p>
            <p>Количество</p>
            <p>Удалить</p>
          </Thead>
          <ol>
            {store.product.map((item, index) => {
              return (
                item.quantiti !== 0 && (
                  <li>
                    <Tbody className="id" key={item.id}>
                      {/* <p>{index + 1} </p> */}
                      <TImg>
                        <img src={item.url} />
                      </TImg>
                      <div style={{display:"flex",justifyContent:"flex-start"}}>{item.productname} </div>
                      <div style={{marginRight:"90px"}}>{item.price} </div>
                      <ContainerCount>
                        <ButtonCount
                          onClick={() => {decProduct(item.id)}}
                        >
                          -
                        </ButtonCount>
                        <span>{item.quantiti} </span>
                        <ButtonCount
                          onClick={() => {incProduct(item.id)}}
                        >
                          +
                        </ButtonCount>
                      </ContainerCount>
                      
                      <ButtonRemove
                        onClick={() =>{ removeProduct(item.id)}}
                      >
                        Remove
                      </ButtonRemove>
                      
                    </Tbody>
                  </li>
                )
              );
            })}
          </ol>
        </Table>
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "3rem" }}>TOTAL:{resultTotal} </p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const Table = styled.div`
  display: flex;
  flex-direction: column;
`;
const Thead = styled.div`
  display: flex;
  justify-content:space-between;
  align-items: center;
  height: 70px;
  font-size: 1.6rem;
  font-weight: 600;
  border-top: 3px solid #dcdcdc;

  .id {
    width: 100px;
    display: flex;
    justify-content: center;
    margin-top: -10;
  }

  p {
    width: 200px;
    height: 20px;
    display: flex;
    justify-content: center;
  }
`;
const TImg = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content:start;
  img {
    width: 95px;
    height: 76px;
    object-fit: contain;
  }
`;
const Tbody = styled.div`
  display: flex;
 justify-content:center;
  align-items: center;
  
  height: 90px;
  font-size: 1.6rem;
  font-weight: 600;
  border-top: 3px solid #dcdcdc;
  .id {
    width: 100px;
    font-weight: 600;
  }
  div {
    width: 240px;
  }
`;
const ContainerCount = styled.div`
  display: flex;
  gap: 9px;
`;
const ButtonCount = styled.button`
  padding: 10px;
  background-color: #19a2b792;
  color: #fff;
  border-radius: 4px;
  border: none;
`;
const ButtonRemove = styled.button`
  padding: 10px;
  margin-right:60px;
  background-color: #ef1e33ea;
  color: #fff;
  border-radius: 4px;
  border: none;
  font-size: 1.4rem;
 
`;
