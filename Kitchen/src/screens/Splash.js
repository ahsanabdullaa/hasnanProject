import React from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Splash = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {()=> {(navigation.navigate('Home'))}}>
        <Text style={styles.text}>Bawarchi</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FE724C',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
  });

export default Splash
