import { Filter } from "@/types/tasks";
import { CategoryAttributes } from "@/constants";
import { FilterOptions, Option } from "./DurationFilter.styles";

interface IDurationFilter {
  filter: Filter;
  setFilter: (selectedFilter: Filter) => void;
}

const DurationFilter = ({ filter, setFilter }: IDurationFilter) => {
  return (
    <FilterOptions>
      {Object.entries(CategoryAttributes).map(([key, option]) => (
        <Option
          key={key}
          size="small"
          label={option.label}
          isSelected={option.label === filter}
          backgroundColor={option.color}
          onClick={() => setFilter(Filter[option.label as keyof typeof Filter])}
        />
      ))}
    </FilterOptions>
  );
};

export default DurationFilter;
