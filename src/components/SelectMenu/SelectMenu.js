import {
  useState,
  useImperativeHandle,
  forwardRef
} from 'react';
import { Option } from 'components';
import classNames from 'classnames';
import './SelectMenu.css';

const DISPLAY_NAME = 'menu';
const NO_SELECTION_TEXT = 'Select all';
const NO_SELECTION_VALUE = '';

const SelectMenu = forwardRef(function ({
  id,
  name,
  onChange, // (val) => {}  or  ([val]) => {}
  onSelectAll,
  children,
  selectedValues = [],
  enableNoSelectionOption = false,
  noSelectionOptionText = NO_SELECTION_TEXT,
}, ref) {
  const highlightedValues = selectedValues;
  const [show, setShow] = useState(false);

  // Since the logic for opening & closing the Menu is relatively complex,
  // it makes sense to move it into the component itself and expose it via
  // useImperativeHandle, that way the logic doesn't need to be ducpliated
  // across all parent components that may use the Menu component
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (!show) {
          setShow(true);
    
          // delay adding event listener, as otherwise current click event
          // will trigger this
          setTimeout(() => document.addEventListener('click', () => {
            console.log('closing menu listener');
            setShow(false);
          }, { once: true }));
        }
      }
    };
  }, [show]);

  return (
    <div className={classNames(`${DISPLAY_NAME}-container`, { hide: !show })}>
      {enableNoSelectionOption && (
        <em>
          <Option
            value={NO_SELECTION_VALUE}
            highlighted={highlightedValues.some((value) => value === NO_SELECTION_VALUE)}
            hasCheckbox
            onClick={onSelectAll}
          >
            {noSelectionOptionText}
          </Option>
        </em>
      )}
      {children.map((Component) => (
        <Option
          // {...Component.props}
          value={Component.props.value}
          key={Component.props.value}
          highlighted={highlightedValues.some((value) => value === Component.props.value)}
          hasCheckbox
          onClick={onChange}
        >
          {Component.props.children}
        </Option>
      ))}
    </div>
  )
});

export default SelectMenu;
