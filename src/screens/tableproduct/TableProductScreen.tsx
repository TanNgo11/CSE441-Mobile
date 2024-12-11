import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity,ScrollView } from 'react-native';
import {useGetListProducts } from "queries/product/useGetListProducts";

import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const {
    data: productList,
    error,
    isError,
    isFetching,
  } = useGetListProducts();

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  if (isError || !productList) {
    return <Text>Failed to load user information.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual profile image URL
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.subtitle}>Have a nice day</Text>
          </View>
        </View>

      </LinearGradient>

      {/* New Booking Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>List Product</Text>
        <FlatList data={productList}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.price}</Text>
                  <Text style={styles.cardTime}>
                   {item.ratings}
                  </Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.buttonText}>Detail</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    flex: 0.4,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
  },
  headerImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 15,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  cardTime: {
    fontSize: 14,
    color: '#555',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
  },
});

export default App;
