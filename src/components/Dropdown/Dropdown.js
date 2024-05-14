import { useState, useRef, useMemo } from 'react';
import { Menu } from 'components';
import classNames from 'classnames';
import './Dropdown.css';

const DISPLAY_NAME = 'dropdown';
const SINGLE_SPECIAL_SELECTION_TEXT = 'None';
const MULTI_SPECIAL_SELECTION_TEXT = 'Please select';
const SPECIAL_SELECTION = {
  true: MULTI_SPECIAL_SELECTION_TEXT,
  false: SINGLE_SPECIAL_SELECTION_TEXT
};
const TEXT_SEPARATOR = ', ';
const NO_SELECTION_VALUE = '';

/**
 * multiSelect - true for a multi-selection dropdown, false for single-selection
 * defaultOption - default selected option for single-selection dropdown, in
 *   the form of { value: '', text: '' }. If no default is given, the special
 *   selection option is used if provided, and if not then the first option
 *   is used.
 * enableSpecialSelectionOption - for single-selection dropdowns, this enables
 *   a non-selection opton. For multi-selection dropdowns, this enables a
 *   select / deselect all option.
 * specialSelectionOptionText - the text to be displayed by the special selection
 *   option. Default is `None` for single-selection and `Select all` for multi-
 *   selection
 */
function Dropdown({
  label,
  children,
  multiSelect = false,
  defaultOption = {},
  enableSpecialSelectionOption = false,
  specialSelectionOptionText = SPECIAL_SELECTION[multiSelect]
}) {
  const firstValue = enableSpecialSelectionOption
    ? NO_SELECTION_VALUE : children?.[0]?.props?.value;
  const firstText = enableSpecialSelectionOption
    ? specialSelectionOptionText : children?.[0]?.props?.children;
  const singleInitialSelectedValues = defaultOption.value || firstValue;
  const multiInitialSelectedValues = [];
  const initialSelectedValues = multiSelect ?
    multiInitialSelectedValues : [singleInitialSelectedValues];
  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

  const singleInitialSelectedTexts = defaultOption.text || firstText;
  const multiInitialSelectedTexts = [];
  const initialSelectedTexts = multiSelect ?
    multiInitialSelectedTexts : [singleInitialSelectedTexts];
  const [selectedTexts, setSelectedTexts] = useState(initialSelectedTexts);

  const displayText = useMemo(() => {
    return selectedTexts.join(TEXT_SEPARATOR) || specialSelectionOptionText
  }, [selectedTexts, specialSelectionOptionText]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showbuttonOpenStyle, setShowButtonOpenStyle] = useState(false);
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.open();
  };

  const singleOnMenuChange = (value, text) => {
    setSelectedValues([value]);
    setSelectedTexts([text]);
  };

  const multiOnMenuChange = (value, text) => {
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
    } else if (newSelectedValues.length === children.length) {
      newSelectedValues.push(NO_SELECTION_VALUE);
      setIsAllSelected(true);
    }
    setSelectedValues(newSelectedValues);
    setSelectedTexts(newSelectedTexts);
  };

  const onMenuChange = multiSelect ? multiOnMenuChange : singleOnMenuChange;

  const onSelectAll = () => {
    if (!isAllSelected) {
      const allSelectedValues = children.map(({ props: { value }}) => value);
      if (enableSpecialSelectionOption) {
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
    <div className={classNames(
      `${DISPLAY_NAME}`,
      { 'open-label': showbuttonOpenStyle }
    )}>
      <div className={`${DISPLAY_NAME}-label`}>
        {label}
      </div>
      <div className={`${DISPLAY_NAME}-container`}>
        <button
          className={classNames(`${DISPLAY_NAME}-select`, { open: showbuttonOpenStyle })}
          onClick={openMenu}
        >
          {displayText}
        </button>
        <Menu
          ref={menuRef}
          multiSelect={multiSelect}
          setShowButtonOpenStyle={setShowButtonOpenStyle}
          selectedValues={selectedValues}
          enableSpecialSelectionOption={enableSpecialSelectionOption}
          onChange={onMenuChange}
          onSelectAll={onSelectAll}
        >
          {children}
        </Menu>
      </div>
    </div>
  )
}

export default Dropdown;
