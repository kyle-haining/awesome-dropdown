import { useState, useRef, useMemo, useCallback } from 'react';
import { SelectMenu } from 'components';
import classNames from 'classnames';
import './SelectDropdown.css';

const DISPLAY_NAME = 'dropdown';
const NO_SELECTION_TEXT = 'Please select';
const TEXT_SEPARATOR = ', ';
const NO_SELECTION_VALUE = '';

function SelectDropdown({
  onChange, // (val) => {}  or  ([val]) => {}
  children,
  defaultOption = {}, // { value: '', text: '' }
  enableNoSelectionOption = false,
  noSelectionTextOption = NO_SELECTION_TEXT,
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  console.log('selectedValues', selectedValues);
  console.log('selectedTexts', selectedTexts);
  console.log('selecting all', children)
  console.log('values are', children.map(({ props: { children }}) => children));
  console.log(' ');
  const displayText = useMemo(() => {
    return selectedTexts.join(TEXT_SEPARATOR) || noSelectionTextOption
  }, [selectedTexts, noSelectionTextOption]);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.open();
  };

  const onMenuChange = (value, text) => {
    const index = selectedValues.findIndex((v) => v === value);
    let newSelectedValues;
    let newSelectedTexts;
    if (index === -1) {
      newSelectedValues = [...selectedValues, value];
      newSelectedTexts = [...selectedTexts, text];
    } else {
      newSelectedValues = selectedValues.toSpliced(index, 1);
      newSelectedTexts = selectedTexts.toSpliced(index, 1);
    }
    if (isAllSelected) {
      const specialSelectionindex = newSelectedValues.findIndex((v) => v === NO_SELECTION_VALUE);
      if (specialSelectionindex !== -1) {
        newSelectedValues = newSelectedValues.toSpliced(specialSelectionindex, 1);
      }
      setIsAllSelected(false);
    }
    setSelectedValues(newSelectedValues);
    setSelectedTexts(newSelectedTexts);
  };

  const onSelectAll = () => {
    if (!isAllSelected) {
      const allSelectedValues = children.map(({ props: { value }}) => value);
      if (enableNoSelectionOption) {
        allSelectedValues.push(NO_SELECTION_VALUE);
      }
      setSelectedValues(allSelectedValues);
      setSelectedTexts(children.map(({ props: { children }}) => children));
      setIsAllSelected(true);
    } else {
      setSelectedValues([]);
      setSelectedTexts([]);
      setIsAllSelected(false);
    }
  };

  return (
    <div className={`${DISPLAY_NAME}-container`}>
      <button
        className={classNames(`${DISPLAY_NAME}-select`, { open: showMenu })}
        onClick={openMenu}
      >
        {displayText}
      </button>
      <SelectMenu
        ref={menuRef}
        show={showMenu}
        selectedValues={selectedValues}
        enableNoSelectionOption={enableNoSelectionOption}
        onChange={onMenuChange}
        onSelectAll={onSelectAll}
      >
        {children}
      </SelectMenu>
    </div>
  )
}

export default SelectDropdown;
