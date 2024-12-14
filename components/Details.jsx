import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Linking, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/Themecontext';

export default function Details({ route }) {
  const { item } = route.params;
  const [showFullAddress, setShowFullAddress] = useState(false);
  
       const { isDarkMode } = useTheme();

  const renderDetailItem = (iconName, label, value, onPress = null , chevron=null) => (
    <TouchableOpacity style={styles.detailItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color="#4A90E2" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, {color:isDarkMode?"white" : "gray"}, onPress && styles.linkText]}>{value}</Text>
      </View>
      {onPress && (
       chevron && <Ionicons name={chevron} size={20} color="#4A90E2" />
      )}
    </TouchableOpacity>
  );

  const handlePhonePress = () => {
    Linking.openURL(`tel:${item.phone}`);
  };

  const handleWebsitePress = () => {
    Linking.openURL(`https://${item.website}`);
  };

  const handleAddressPress = () => {
    setShowFullAddress(!showFullAddress);
  };

  const getAddressString = () => {
    if (showFullAddress) {
      return `${item.address.street}, ${item.address.suite}, ${item.address.city} - ${item.address.zipcode}`;
    }
    return `${item.address.street}, ${item.address.city}`;
  };

  return (
    <SafeAreaView style={isDarkMode ? styles.darksafe : styles.safeArea }>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
           <Image
                                      source={{ uri: `https://robohash.org/${item.id}` }}
                                      style={styles.avatar}
            />
          <Text style={isDarkMode ? styles.darkname : styles.name}>{item.name}</Text>
          <Text style={ { color : isDarkMode ? "white" : "black"}}>@{item.username}</Text>
        </View>

        <View style={styles.card}>
          {renderDetailItem("mail-outline", "Email", item.email)}
          {renderDetailItem("call-outline", "Phone", item.phone, handlePhonePress , "chevron-forward-outline")}
          {renderDetailItem("globe-outline", "Website", item.website, handleWebsitePress , "chevron-forward-outline")}
          {renderDetailItem("business-outline", "Company", item.company.name)}
          {renderDetailItem(
            "location-outline",
            "Address",
            getAddressString(),
            handleAddressPress ,
            "chevron-down-outline"
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  darksafe: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  darkname: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
},
  username: {
    fontSize: 16,
    color: '#666',
  },
  card: {
 

    padding: 20,
   
 
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
   
    fontWeight: '500',
  },
  linkText: {
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
});

