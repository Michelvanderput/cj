interface FilterBarProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

const FilterBar = ({ tags, selectedTags, onTagToggle, onClearAll }: FilterBarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wide">Filter by tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1.5 text-sm border transition-colors ${
                isSelected
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
