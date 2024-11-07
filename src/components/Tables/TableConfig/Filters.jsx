import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

const Filters = ({ columnFilters, setColumnFilters, filterPlaceholder, data }) => {
  const handleFilterChange = (event) => {
    const value = event.target.value;
    const updatedFilters = [{ id: 'name', value }];
    setColumnFilters(updatedFilters);
  };

  useEffect(() => {
    if (data && data.length) {
      const updatedFilters = columnFilters.filter(filter => filter.value);
      setColumnFilters(updatedFilters);
    }
  }, [data]);

  return (
    <InputGroup mb={4}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder={filterPlaceholder}
        onChange={handleFilterChange}
        size="md"
      />
    </InputGroup>
  );
};

export default Filters;
