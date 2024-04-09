import {RetrieveTokenFromLocalStorage} from '../utils/GetDeleteStoreTokenInLocalStorage';
import {apiService} from './apiService';

export const getSneakersOrSneakerRequests = async ({
  setLoading,
  page = 1,
  value,
  setValue,
  searchQuery,
  selectedGenders,
  selectedBrands,
  selectedSizes,
  apicall,
  paginated = false,
}) => {
  setLoading(true);
  let token = await RetrieveTokenFromLocalStorage();
  const response = await apiService.post(
    apicall,
    {
      searchQuery,
      filters: {
        Gender: selectedGenders,
        Brand: selectedBrands,
        Size: selectedSizes,
      },
      pagination: {
        limit: 10,
        page,
      },
    },
    {
      Authorization: `Bearer ${token}`,
    },
  );
  if (paginated) {
    setValue([...value, ...(response?.data || [])]);
  } else {
    setValue(response.data);
  }

  setLoading(false);
};
