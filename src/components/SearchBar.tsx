interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search projects...' }: SearchBarProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-900 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
