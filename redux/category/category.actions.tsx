import { ISetCurrentCategory } from "../interfaces";
import { categoryTypes } from "./category.types";

export const setCurrentCategory = ({ id, name }: ISetCurrentCategory) => ({
  type: categoryTypes.SET_CURRENT,
  payload: { name, id },
});
