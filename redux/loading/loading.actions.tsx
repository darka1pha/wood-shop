import { loadingTypes } from "./loading.types";

export const setLoading = (isLoading: boolean) => ({
  type: loadingTypes.SET_LOADING,
  payload: isLoading,
});
