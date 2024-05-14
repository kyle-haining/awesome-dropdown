import {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react';
import { Option } from 'components';
import classNames from 'classnames';
import './Menu.css';

const DISPLAY_NAME = 'menu';
const NO_SELECTION_TEXT = 'None';
const NO_SELECTION_VALUE = null;

const Menu = forwardRef(function ({
  id,
  name,
  onChange, // (val) => {}  or  ([val]) => {}
  children,
  selectedValue = null,
  enableNoSelectionOption = false,
  noSelectionOptionText = NO_SELECTION_TEXT,
}, ref) {
  const [highlightedValue, setHighlightedValue] = useState(selectedValue);
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
            setShow(false);
          }, { once: true }));
        }
        setHighlightedValue(selectedValue);
      }
    };
  }, [selectedValue, show]);

  const handleMouseOver = (value) => {
    setHighlightedValue(value);
  };

  return (
    <div className={classNames(`${DISPLAY_NAME}-container`, { hide: !show })}>
      {enableNoSelectionOption && (
        <em>
          <Option
            value={NO_SELECTION_VALUE}
            highlighted={highlightedValue === NO_SELECTION_VALUE}
            onMouseOver={handleMouseOver}
            onClick={onChange}
          >
            {noSelectionOptionText}
          </Option>
        </em>
      )}
      {children.map((Component) => (
        <Option
          {...Component.props}
          key={Component.props.value}
          highlighted={highlightedValue === Component.props.value}
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
