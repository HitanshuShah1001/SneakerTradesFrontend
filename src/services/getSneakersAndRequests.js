import {STATUS_SUCCESS} from '../constants/ApiParams';
import {RetrieveTokenFromLocalStorage} from '../utils/GetDeleteStoreTokenInLocalStorage';
import {apiService} from './apiService';

export const getSneakersOrSneakerRequests = async ({
  setLoading,
  setValue,
  searchQuery,
  selectedGenders,
  selectedBrands,
  selectedSizes,
  apicall,
}) => {
  setLoading(true);
  const response = await apiService.post(apicall, {
    searchQuery,
    filters: {
      Gender: selectedGenders,
      Brand: selectedBrands,
      Size: selectedSizes,
    },
  });
  if (response.status === STATUS_SUCCESS) {
    setValue(response.Data.data);
  }
  setLoading(false);
};
