import {createContext, useState} from 'react';
import {GENDER_ROLES} from '../../constants/Labels';

export const SneakerContext = createContext();

export const SneakerWrapper = ({children}) => {
  const [sneakers, setSneakers] = useState([]);
  const [checkboxopts, setCheckboxOpts] = useState(GENDER_ROLES);
  const [selectedFilter, setSelectedFilter] = useState('Gender');
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [count, setCount] = useState(0);
  const [requestPage, setRequestPage] = useState(1);
  const [page, setPage] = useState(1);
  const valuesToShare = {
    sneakers,
    setSneakers,
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
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    requestPage,
    setRequestPage,
  };

  return (
    <SneakerContext.Provider value={valuesToShare}>
      {children}
    </SneakerContext.Provider>
  );
};
