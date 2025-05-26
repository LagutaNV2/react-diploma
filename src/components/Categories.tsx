// src/components/Categories.tsx
import React from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { selectCategory, fetchMainCatalogStart } from '../features/catalog/catalogSlice';

type Props = {
  onCategorySelect?: (categoryId: number) => void;
  isClickable?: boolean;
};

const Categories = ({ onCategorySelect, isClickable = true }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.catalog.categories);
  const selectedCategory = useSelector((state: RootState) => state.catalog.selectedCategory);

  const handleCategoryClick = (categoryId: number) => {
    if (!isClickable) return;

    const newCategoryId = Number(categoryId);

    dispatch(selectCategory(newCategoryId));

    if (onCategorySelect) {
      onCategorySelect(newCategoryId);
    }
  };

  console.log('Rendering Categories, active:', selectedCategory);

  return (
    <section className="categories">
      <ul className="catalog-categories nav justify-content-center">
        {categories.map(category => (
          <li key={category.id} className="nav-item">
            <button
              className={`nav-link ${
                selectedCategory === category.id ? 'active' : ''
              }`}
              onClick={() => handleCategoryClick(category.id)}
              disabled={!isClickable}
            >
              {category.title}
              {selectedCategory === category.id && (
                <span className="visually-hidden">(current)</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
