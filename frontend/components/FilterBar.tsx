import React from "react";
import { Filter, X } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import Select from "./ui/Select";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface FilterBarProps {
  filters: {
    category: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (filters: {
    category: string;
    startDate: string;
    endDate: string;
  }) => void;
  onClearFilters: () => void;
}

const categories = [
  { value: "All", label: "All Categories" },
  { value: "Food", label: "Food" },
  { value: "Transport", label: "Transport" },
  { value: "Shopping", label: "Shopping" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Education", label: "Education" },
  { value: "Bills", label: "Bills" },
  { value: "Others", label: "Others" },
];

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters =
    filters.category !== "All" || filters.startDate || filters.endDate;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <Filter className="h-4 w-4 mr-2" />
            Filters:
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={filters.category}
              onChange={(e) =>
                onFilterChange({ ...filters, category: e.target.value })
              }
              options={categories}
              className="text-sm"
            />

            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                onFilterChange({ ...filters, startDate: e.target.value })
              }
              placeholder="Start Date"
              className="text-sm"
            />

            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                onFilterChange({ ...filters, endDate: e.target.value })
              }
              placeholder="End Date"
              className="text-sm"
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterBar;
