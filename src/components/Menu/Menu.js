import { useState, useCallback } from 'react';
import { Option } from 'components';
import classNames from 'classnames';
import './Menu.css';

const DISPLAY_NAME = 'menu';
const NO_SELECTION_TEXT = 'None';
const NO_SELECTION_VALUE = null;

function Menu({
  id,
  name,
  show,
  onChange, // (val) => {}  or  ([val]) => {}
  children,
  selectedValue = null,
  enableNoSelectionOption = false,
  noSelectionOptionText = NO_SELECTION_TEXT,
}) {
  const [highlightedValue, setHighlightedValue] = useState(selectedValue);

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
}

export default Menu;
