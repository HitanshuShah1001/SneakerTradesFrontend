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
  let token = await RetrieveTokenFromLocalStorage();
  const response = await apiService.post(apicall, {
    searchQuery,
    filters: {
      Gender: selectedGenders,
      Brand: selectedBrands,
      Size: selectedSizes,
    },
  });
  setValue(response.Data.data);
  setLoading(false);
};
