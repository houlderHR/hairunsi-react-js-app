import Icon from '../../Icon';

const InputSearch: React.FC = () => (
  <div className="bg-gray-3 hover:bg-white duration-300 flex items-center flex-row px-5 gap-x-2.5 active:bg-white focus:bg-white w-full rounded">
    <span>
      <Icon name="search" size="18" />
    </span>
    <input
      type="text"
      placeholder="Search"
      className="bg-transparent cursor-pointer py-3 w-full border-transparent text-xs placeholder:text-black-1 focus:outline-none"
    />
  </div>
);

export default InputSearch;
