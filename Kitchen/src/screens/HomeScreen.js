import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';

// const backgroundImage = require('../images/images.jpeg');

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={backgroundImage} style={styles.background}> */}
        <Text style={styles.text}>Welcome to Bawarchi</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress = {()=> {(navigation.navigate('Signup'))}}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=> {(navigation.navigate('Signin'))}}>
            <Text style={styles.buttonText}>Signin</Text>
          </TouchableOpacity>
        </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  // overlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: 'rgba(255, 255, 255, 0.9)'
  // },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: "40%",
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    marginBottom:"40%"
  },
  button: {
    backgroundColor: '#FE724C',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default HomeScreen;
