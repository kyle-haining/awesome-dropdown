import { useState, useRef, useCallback } from 'react';
import { Menu, Option } from 'components';
import classNames from 'classnames';
import './Dropdown.css';

const DISPLAY_NAME = 'dropdown';
const NO_SELECTION_TEXT = 'None';
const NO_SELECTION_VALUE = '';

function Dropdown({
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
  const [selectedValue, setSelectedValue] = useState(defaultOption.value || firstValue);
  const [displayText, setDisplayText] = useState(defaultOption.text || firstText);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.open();
  };

  const onMenuChange = useCallback((value, children) => {
    setSelectedValue(value);
    setDisplayText(children);
  }, []);

  return (
    <div className={`${DISPLAY_NAME}-container`}>
      <button
        className={classNames(`${DISPLAY_NAME}-select`, { open: showMenu })}
        onClick={openMenu}
      >
        {displayText}
      </button>
      <Menu
        ref={menuRef}
        show={showMenu}
        selectedValue={selectedValue}
        enableNoSelectionOption={enableNoSelectionOption}
        onChange={onMenuChange}
      >
        {children}
      </Menu>
    </div>
  )
}

export default Dropdown;
