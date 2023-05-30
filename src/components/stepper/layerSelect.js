import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";

const LayerSelect = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [options, setOptions] = useState([]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setSubcategory("");
    setOptions(getSubcategoryOptions(selectedCategory));
  };

  const handleSubcategoryChange = (event) => {
    const selectedSubcategory = event.target.value;
    setSubcategory(selectedSubcategory);
  };

  const getSubcategoryOptions = (category) => {
    // 根据选择的 category 获取对应的 subcategory 选项
    // 这里假设根据 category 返回相应的选项数组
    if (category === "Category 1") {
      return ["Subcategory 1A", "Subcategory 1B", "Subcategory 1C"];
    } else if (category === "Category 2") {
      return ["Subcategory 2A", "Subcategory 2B", "Subcategory 2C"];
    } else if (category === "Category 3") {
      return ["Subcategory 3A", "Subcategory 3B", "Subcategory 3C"];
    }
    return [];
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Select
        value={category}
        onChange={handleCategoryChange}
        className="mb-4 w-full rounded-lg h-10 border-amber-100"
      >
        <MenuItem value="">Select Layer</MenuItem>
        <MenuItem value="Category 1">Category 1</MenuItem>
        <MenuItem value="Category 2">Category 2</MenuItem>
        <MenuItem value="Category 3">Category 3</MenuItem>
      </Select>

      <Select
        value={subcategory}
        onChange={handleSubcategoryChange}
        disabled={!category}
        className="mb-4 w-full rounded-lg h-10"
      >
        <MenuItem value="">Select Address</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default LayerSelect;
