import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const [cart, setCart] = useState([]);
  let itemList = [
    {name: 'momo', qty: 1, price: 20},
    {name: 'apple', qty: 1, price: 10},
    {name: 'paneer', qty: 1, price: 30},
    {name: 'mango', qty: 1, price: 40},
  ];

  useEffect(() => {
    console.log(cart, 'cart');
  }, [cart]);

  return (
    <>
      {itemList.length > 0 && (
        <FlatList
          data={itemList}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <TouchableOpacity onPress={() => setCart([...cart, item])}>
                <Text>add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={{margin: '50px', padding: '50px'}}>
        <Text>Cart:</Text>
        <TouchableOpacity onPress={() => setCart([])}>
          <Text>cleart Cart:</Text>
        </TouchableOpacity>
      </View>
      {cart.length > 0 && (
        <FlatList
          data={cart}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <TouchableOpacity onPress={() => setCart([...cart, item])}>
                <Text>add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </>
  );
};

export default App;
