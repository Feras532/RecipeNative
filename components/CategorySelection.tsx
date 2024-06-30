import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { categories } from '@/constants/categories';
import CustomText from './ui/CustomText';
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
          style={[
            styles.categoryButton,
            selectedCategory === category.label && styles.selectedCategoryButton
          ]}
          onPress={() => onCategoryPress(category.label)}
        >
          <CustomText style={styles.categoryEmoji}>{category.emoji}</CustomText>
          <CustomText style={styles.categoryLabel}>{category.label}</CustomText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryScroll: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff', // Default background color
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 8
  },
  selectedCategoryButton: {
    backgroundColor: '#fff1d0', // Selected background color
    borderColor: "#B24B3D",
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#000000',
  },
});

export default CategorySelection;
