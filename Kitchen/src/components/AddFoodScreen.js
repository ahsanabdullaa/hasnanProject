import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AddFoodScreen = ({ navigation }) => {
  const [name, setFoodName] = useState("");
  const [description, setFoodDescription] = useState("");
  const [price, setFoodPrice] = useState("");
  const [image, setFoodImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFoodImage(result.uri);
    }
  };

  const saveFood = () => {
    const data = {
      name: name,
      description: description,
      price: price,
      image: image,
    };
    // await

    AsyncStorage.getItem("token").then((res) => {
      const token = res;
      console.log(token);
      axios
        .post("http://localhost:3500/food", data, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigation.navigate("Welcome");
        })
        .catch((err) => {
          console.log(err);
        })
        .catch((error) => {
          console.error("Error saving food:", error);
        });
    });

    // fetch('http://localhost:3500/food', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     console.log('Food saved successfully!', responseData);
    //     navigation.navigate('Welcome');
    //   })
    //   .catch((error) => {
    //     console.error('Error saving food:', error);
    //   });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Food Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setFoodName}
        placeholder="Enter Food name"
      />

      <Text style={styles.label}>Food Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setFoodDescription}
        placeholder="Enter Food description"
      />

      <Text style={styles.label}>Food Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setFoodPrice}
        keyboardType="numeric"
        placeholder="Enter Food price"
      />

      <Button title="Pick an image from camera roll" onPress={pickImage} />

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <Button title="Save Food" onPress={saveFood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddFoodScreen;
