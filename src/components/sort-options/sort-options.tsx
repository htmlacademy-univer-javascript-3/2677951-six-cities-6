import { useState } from 'react';
import { SortType } from '../../constants/sort';

type SortOptionsProps = {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function SortOptions({ currentSort, onSortChange }: SortOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSortClick = (sortType: SortType) => {
    onSortChange(sortType);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleOpen}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sortType) => (
          <li
            key={sortType}
            className={`places__option ${currentSort === sortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortClick(sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;
