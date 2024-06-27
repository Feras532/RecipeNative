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
      <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes..."
        placeholderTextColor="#666"
        value={searchText}
        onChangeText={onSearchTextChange}
      />
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B24B3D",
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
