import SearchIcon from '@icons/Search';

type SearchBarProps = {
  search: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ search, onChange }) => {
  return (
    <div className='relative mx-2 my-2 rounded-md border border-grey-2 px-2 py-2 shadow-md'>
      <input
        value={search}
        placeholder='Search restaurants'
        className='w-full indent-2 text-grey-3 outline-none'
        onChange={({ target: { value } }) => onChange(value)}
      />
      <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2 text-grey-3' />
    </div>
  );
};

export default SearchBar;
