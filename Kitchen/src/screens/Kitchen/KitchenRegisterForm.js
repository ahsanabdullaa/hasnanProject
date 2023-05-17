import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const registerKitchen= async (kitchenData) => {
  try {
    const response = await axios.post('http://localhost:3500/food/register', kitchenData);
    console.log(response.data); 

  } catch (error) {
    console.log('Error registering kitchen:', error);
  }
};
const KitchenRegisterForm = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegistration = () => {
      const kitchenData = {
        fullName,
        email,
        address,
        phoneNumber,
        password,
        userType: 'kitchen',
      };
  
      registerKitchen(kitchenData);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Text style={styles.label}>Address:</Text>
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <Text style={styles.label}>Phone number:</Text>
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button title="Register" onPress={handleRegistration} />
        <TouchableOpacity onPress={()=>{{navigation.navigate("KitchenLogin")}}}>
            <Text> Already have an account? Login!</Text>
          </TouchableOpacity>
      </View>
    );
  };
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});

export default KitchenRegisterForm;
