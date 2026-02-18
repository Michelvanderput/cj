interface FilterBarProps {
  tags: string[];
  labels?: Record<string, string>;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

const FilterBar = ({ tags, labels, selectedTags, onTagToggle, onClearAll }: FilterBarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-body-sm font-medium tracking-wide text-tx-secondary">Filter by work</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-caption text-tx-muted hover:text-brand-secondary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-main rounded-sm"
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
              className={`px-3 py-1.5 text-body-sm rounded-md border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-main ${
                isSelected
                  ? 'bg-brand-main text-tx-inverse border-brand-main shadow-glow-main'
                  : 'bg-surface-elevated text-tx-secondary border-brd hover:border-brd-hover hover:text-tx-primary'
              }`}
            >
              {labels?.[tag] ?? tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
