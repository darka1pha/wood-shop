import { createSelector } from "reselect";

const selectLoading = (state: any) => state.loading;

export const selectIsLoading = createSelector(
  [selectLoading],
  (loading) => loading.isLoading
);
