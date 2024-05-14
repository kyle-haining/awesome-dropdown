import { useState, useRef, useMemo, useCallback } from 'react';
import { SelectMenu } from 'components';
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
  const [selectedTexts, setSelectedTexts] = useState([]);
  console.log('selectedValues', selectedValues);
  console.log('selectedTexts', selectedTexts);
  console.log(' ');
  const displayText = useMemo(() => {
    return selectedTexts.join(', ') || noSelectionTextOption
  }, [selectedTexts, noSelectionTextOption]);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.open();
  };

  const onMenuChange = useCallback((value, text) => {
    const index = selectedValues.findIndex((v) => v === value);
    if (index === -1) {
      setSelectedValues([...selectedValues, value]);
      setSelectedTexts([...selectedTexts, text]);
    } else {
      setSelectedValues(selectedValues.toSpliced(index, 1));
      setSelectedTexts(selectedTexts.toSpliced(index, 1));
    }
  }, [selectedValues, selectedTexts]);

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
