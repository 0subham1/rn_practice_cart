import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {  Button } from "react-native-paper";

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState([]);
  let itemList = [
    {name: 'momo', price: 20},
    {name: 'apple', price: 10},
    {name: 'paneer', price: 30},
    {name: 'mango', price: 40},
  ];

  useEffect(() => {
    console.log(cart, 'cart');
  }, [cart]);

  const handleAddToCart = item => {
    item.qty = 1;
    item.amount = item.price;

    handleTotal([...cart, item]);

    setCart([...cart, item]);
  };

  // const handleAddToCart = item => {
  //   let arr = [...cart];

  //   item.qty = 1;
  //   item.amount = item.price
  //   handleTotal([cart])
  //   setCart([...cart, item]);
  // };

  useEffect(() => {
    handleTotal(cart);
  }, [cart]);

  const handleQtyInc = i => {
    let arr = [...cart];
    arr[i].qty = arr[i].qty + 1;
    arr[i].amount = arr[i].qty * arr[i].price;
    handleTotal(arr);

    setCart(arr);
  };
  const handleQtyDec = i => {
    let arr = [...cart];
    if (arr[i].qty > 1) {
      arr[i].qty = arr[i].qty - 1;
      arr[i].amount = arr[i].qty * arr[i].price;
      handleTotal(arr);

      setCart(arr);
    }
  };
  const handleRemoveItem = i => {
    let arr = [...cart];
    arr.splice(i, 1);
    setCart(arr);
    handleTotal(arr);
  };

  const handleTotal = arr => {
    let sum = 0;
    arr.map(a => {
      sum += a.amount;
    });
    setTotal(sum);
  };
  return (
    <SafeAreaProvider>
      <PaperProvider>
        {itemList.length > 0 && (
          <FlatList
            data={itemList}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: '10px',
                }}>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
                <Button onPress={() => handleAddToCart(item)}>
                  Add
                </Button>
              </View>
            )}
          />
        )}

        <View
          style={{
            margin: '50px',
            padding: '50px',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>Cart:</Text>
          <Text>Total:{total}</Text>
          <Text onPress={() => setCart([])}>clear Cart:</Text>
        </View>
        {cart.length > 0 && (
          <FlatList
            data={cart}
            renderItem={({item, index}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>{item.name}</Text>
                <Text>qty: {item.qty}</Text>
                <Text>price: {item.price}</Text>

                <Button onPress={() => handleQtyInc(index)}>+</Button>
                <Button onPress={() => handleQtyDec(index)}>-</Button>
                <Button onPress={() => handleRemoveItem(index)}>X</Button>
              </View>
            )}
          />
        )}
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
