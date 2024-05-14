import { useState, useRef, useCallback } from 'react';
import { SelectMenu, Option } from 'components';
import classNames from 'classnames';
import './SelectDropdown.css';

const DISPLAY_NAME = 'dropdown';
const NO_SELECTION_TEXT = 'Please select';
const NO_SELECTION_VALUE = '';

function SelectDropdown({
  id,
  name,
  onChange, // (val) => {}  or  ([val]) => {}
  children,
  defaultOption = {}, // { value: '', text: '' }
  enableNoSelectionOption = false,
  noSelectionTextOption = NO_SELECTION_TEXT,
}) {
  const firstValue = enableNoSelectionOption
    ? NO_SELECTION_VALUE : children?.[0]?.props?.value;
  const firstText = enableNoSelectionOption
    ? noSelectionTextOption : children?.[0]?.props?.children;
  const [selectedValues, setSelectedValues] = useState([]);
  const [displayText, setDisplayText] = useState(noSelectionTextOption);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.open();
  };

  const onMenuChange = useCallback((value, text) => {
    const index = selectedValues.findIndex((v) => v === value);
    if (index === -1) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.toSpliced(index, 1));
    }
    setDisplayText(text);
  }, [selectedValues]);

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
      >
        {children}
      </SelectMenu>
    </div>
  )
}

export default SelectDropdown;
