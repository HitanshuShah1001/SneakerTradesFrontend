import {createContext, useState} from 'react';
import {GENDER_ROLES} from '../../constants/Labels';

export const SneakerRequestContext = createContext();

export const SneakerRequestWrapper = ({children}) => {
  const [sneakerrequests, setSneakerRequests] = useState([]);
  const [checkboxopts, setCheckboxOpts] = useState(GENDER_ROLES);
  const [selectedFilter, setSelectedFilter] = useState('Gender');
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [count, setCount] = useState(0);

  const valuesToShare = {
    sneakerrequests,
    setSneakerRequests,
    checkboxopts,
    setCheckboxOpts,
    selectedBrands,
    selectedGenders,
    selectedFilter,
    selectedSizes,
    allFilters,
    setSelectedBrands,
    setSelectedFilter,
    setSelectedGenders,
    setAllFilters,
    setSelectedSizes,
    refreshing,
    setRefreshing,
    count,
    setCount,
    searchQuery,
    setSearchQuery,
  };

  return (
    <SneakerRequestContext.Provider value={valuesToShare}>
      {children}
    </SneakerRequestContext.Provider>
  );
};
