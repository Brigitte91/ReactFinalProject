import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext({});
CategoryContext.displayName = "CategoryContext";

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");

      setCategories(await response.json());
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
