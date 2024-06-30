import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchTextChange }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes..."
        placeholderTextColor="#666"
        value={searchText}
        onChangeText={onSearchTextChange}
      />
      <View style={styles.iconWrapper}>
        <Ionicons name="search" size={20} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#B24B3D",
    backgroundColor: '#fff',
    fontFamily: 'kanit-Regular'
  },
  iconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 15,
    backgroundColor: '#B24B3D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
