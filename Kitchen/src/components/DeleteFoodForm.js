import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DeleteFoodScreen = ({ route, navigation }) => {
  const [id] = route.params;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3500/food/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigation.goBack();
      } else {
        alert('An error occurred while deleting the food');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the food');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to delete this food?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Delete" color="red" onPress={handleDelete} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default DeleteFoodScreen;
