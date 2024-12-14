import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/usefetch';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/Themecontext';

export default function UserList() {
    const { data, error, loading } = useFetch("https://jsonplaceholder.typicode.com/users");
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

     const { isDarkMode } = useTheme();

    const handleNavigation = (item ) => {
        navigation.navigate("details", { item  });
    };

    const filtereddata = data.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );


    



    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={{  backgroundColor: isDarkMode ? 'black' : 'white' }}>
            <View style={isDarkMode? styles.darksearchContainer : styles.searchContainer}>
                <TextInput
                        style={[ isDarkMode ? styles.darkinput : styles.input, { flex: searchQuery ? 0.9 : 1 }]}

                    placeholder="Search"
                    placeholderTextColor="#888"
            
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery && 
                 <Pressable style={styles.clearButton} onPress={() => setSearchQuery('')}>
                 <Text style={styles.clearText}>x</Text>
             </Pressable>
                }
               

            </View>

            <FlatList
                data={filtereddata}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleNavigation(item)} style={styles.item}>
                        <Image
                            source={{ uri: `https://robohash.org/${item.id}` }}
                            style={styles.avatar}
                        />
                        <View style={styles.textContainer}>
                            <Text style={{ color : isDarkMode ? 'white' : "black"}}>{item.name}</Text>
                            <Text  style={{ color : isDarkMode ? 'white' : "black"}}>{item.email}</Text>
                        </View>
                    </Pressable>
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    list: {
        padding: 10,
        paddingBottom: 60,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flexDirection: 'column',
    },
    text: {
        fontSize: 16,
    },
    searchContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        display:'flex',
        flexDirection:"row"
    },
    darksearchContainer: {
      padding: 10,
      backgroundColor: 'black',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      display:'flex',
      flexDirection:"row"
  },
    
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        
    },
    
    darkinput: {
      backgroundColor: 'black',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      fontSize: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      color:"white"
      
  },
    clearButton: {
      backgroundColor: 'black', 
      padding: 10, 
      borderRadius: 2, 
      justifyContent: 'center',
      alignItems: 'center',
      width:10,
      marginLeft: 10, 
      flex:0.1

  },
  clearText: {
      color: '#fff', 
      fontSize: 16,
      fontWeight: 'bold',
  },
});
