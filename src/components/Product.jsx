import React from 'react'
import styled from 'styled-components'
import {useContextStore} from "./StoreContext"


export const Product = () => {

  const {store,addProduct,}=useContextStore()
    
  return (
    <Container>
      <Ul>
        {store.product.map((item)=>(
            <Li key={item.id}>
                <ImgContainer>
                <img src={item.url} />
            </ImgContainer>
            <DataProductContainer>
            <ProductText>{item.productname}  </ProductText>
            <ProductPrice>{item.staticprice} -сом</ProductPrice>
             <Button disabled={item.quantiti > 0} onClick={()=> {addProduct(item.id)}}>В корзину</Button>
              
               </DataProductContainer>
            </Li>
           
        ))}
      </Ul>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const Li = styled.li`
  list-style: none;
  width: 250px;
  height: 360px;
  border: 1px solid #DCDCDC;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 20px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.259);
`;
const ImgContainer = styled.div`
  width: 199px;
  height: 170px;
  display:flex;
  justify-content:center;
  border-bottom: 1px solid #DCDCDC;
  img {
    width: 100%;
    height: 100%;
  }
`;
const DataProductContainer =styled.div`
    display:flex ;
    gap:4px;
    flex-direction:column ;
    align-items: center;
    
    
`
const ProductText=styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0px;
`
const Button=styled.button`
border-radius: 4px;
border: none;
font-size: 1.3rem;
padding: 4px 30px;
background-color: #ef5d28;
color: #fff;
:disabled{background-color: #ff0000a4};
`
const ProductPrice = styled.p`
  font-size:20px;
  font-weight:600;

`


