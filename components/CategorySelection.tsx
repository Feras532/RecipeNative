import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { categories } from '@/constants/categories';

interface CategorySelectionProps {
  selectedCategory: string | null;
  onCategoryPress: (label: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ selectedCategory, onCategoryPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryButton}
          onPress={() => onCategoryPress(category.label)}
        >
          <View style={[
            styles.categoryInner,
            selectedCategory === category.label && styles.selectedCategoryInner,
          ]}>
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
          </View>
          <Text style={styles.categoryLabel}>{category.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryScroll: {},
  categoryButton: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  categoryInner: {
    borderRadius: 50,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff', // Default background color
  },
  selectedCategoryInner: {
    backgroundColor: '#fff1d0', // Selected background color
    borderColor: "#B24B3D",
  },
  categoryEmoji: {
    fontSize: 30,
    lineHeight: 60,
  },
  categoryLabel: {
    fontSize: 14,
    marginTop: 5,
    color: '#000000',
  },
});

export default CategorySelection;
