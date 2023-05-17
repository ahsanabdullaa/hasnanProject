import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditFoodScreen = ({ route, navigation }) => {
  const [id] = route.params;
  const [name, setFoodName] = useState('');
  const [description, setFoodDescription] = useState('');
  const [price, setFoodPrice] = useState('');
  const [image, setFoodImage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3500/food/${_id}`)
      .then(response => response.json())
      .then(data => {
        setFoodName(data.name);
        setFoodDescription(data.description);
        setFoodPrice(data.price);
        setFoodImage(data.image);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFoodImage(result.uri);
    }
  };

  const handleSubmit = () => {
    fetch(`http://localhost:3500/food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        image: image,
      }),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('fooF updated successfully');
        navigation.goBack();
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Food name"
        value={name}
        onChangeText={text => setFoodName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Food description"
        value={description}
        onChangeText={text => setFoodDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Food price"
        keyboardType="numeric"
        value={price}
        onChangeText={text => setFoodPrice(text)}
      />
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        <Button
          title="Pick an image"
          onPress={handleImagePick}
        />
      </View>
      <Button
        title="Update Food"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
});

export default EditFoodScreen;
