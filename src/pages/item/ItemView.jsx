import React from 'react';
import Header from '../../components/header/Header';
import ItemList from '../../components/item/ItemList';
import Navbar from '../../components/navbar/Navbar';

const ItemView = (props) => {
  return (
    <>
      <Header />
      <Navbar />
      <ItemList />
    </>
  )    
};

export default ItemView;