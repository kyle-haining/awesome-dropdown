import {
  useState,
  useImperativeHandle,
  forwardRef
} from 'react';
import { Option } from 'components';
import classNames from 'classnames';
import './Menu.css';

const DISPLAY_NAME = 'menu';
const SINGLE_SPECIAL_SELECTION_TEXT = 'None';
const MULTI_SPECIAL_SELECTION_TEXT = 'Select all';
const SPECIAL_SELECTION = {
  true: MULTI_SPECIAL_SELECTION_TEXT,
  false: SINGLE_SPECIAL_SELECTION_TEXT
};
const NO_SELECTION_VALUE = '';

/**
 * multiSelect - true for a multi-selection dropdown, false for single-selection
 * selectedValue - currently selected values
 * enableSpecialSelectionOption - for single-selection dropdowns, this enables
 *   a non-selection opton. For multi-selection dropdowns, this enables a
 *   select / deselect all option.
 * specialSelectionOptionText - the text to be displayed by the special selection
 *   option. Default is `None` for single-selection and `Select all` for multi-
 *   selection
 */
const Menu = forwardRef(function ({
  onChange,
  onSelectAll,
  setShowButtonOpenStyle,
  children,
  multiSelect = false,
  selectedValues = [],
  enableSpecialSelectionOption = false,
  specialSelectionOptionText = SPECIAL_SELECTION[multiSelect]
}, ref) {
  const [
    singleHighlightedValues,
    setSingleHighlightedValues
  ] = useState(selectedValues);
  const multiHighlightedValues = selectedValues;
  const highlightedValues = multiSelect ?
    multiHighlightedValues : singleHighlightedValues;
  const [show, setShow] = useState(false);

  // Since the logic for opening & closing the Menu is relatively complex,
  // it makes sense to move it into the component itself and expose it via
  // useImperativeHandle, that way the logic doesn't need to be duplicated
  // across all hypothetical parent components that may use the Menu component
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (!show) {
          setShow(true);
          setShowButtonOpenStyle(true);
    
          // delay adding event listener, as otherwise current click event
          // will trigger this
          setTimeout(() => document.addEventListener('click', () => {
            setShow(false);
            setShowButtonOpenStyle(false);
          }, { once: true }));
        }
        if (!multiSelect) {
          setSingleHighlightedValues(selectedValues);
        }
      }
    };
  }, [selectedValues, show, setShowButtonOpenStyle, multiSelect]);

  const handleMouseOver = (value) => {
    if (!multiSelect) {
      setSingleHighlightedValues([value]);
    }
  };

  return (
    <div className={classNames(`${DISPLAY_NAME}-container`, { hide: !show })}>
      {enableSpecialSelectionOption && (
        <em>
          <Option
            value={NO_SELECTION_VALUE}
            highlighted={highlightedValues.some(
              (value) => value === NO_SELECTION_VALUE
            )}
            hasCheckbox={multiSelect}
            onMouseOver={handleMouseOver}
            onClick={multiSelect ? onSelectAll : onChange}
          >
            {specialSelectionOptionText}
          </Option>
        </em>
      )}
      {children.map((Component) => (
        <Option
          value={Component.props.value}
          key={Component.props.value}
          highlighted={highlightedValues.some(
            (value) => value === Component.props.value
          )}
          hasCheckbox={multiSelect}
          onMouseOver={handleMouseOver}
          onClick={onChange}
        >
          {Component.props.children}
        </Option>
      ))}
    </div>
  )
});

export default Menu;
