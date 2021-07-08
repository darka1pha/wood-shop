import { createSelector } from "reselect";

const selectCategory = (state: any) => state.category;

export const selectCurrentCategory = createSelector(
  [selectCategory],
  (category) => category.current
);
