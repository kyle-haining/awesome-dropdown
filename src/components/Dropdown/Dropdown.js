import { useState, useCallback } from 'react';
import { Menu, Option } from 'components';
import classNames from 'classnames';
import './Dropdown.css';

const DISPLAY_NAME = 'dropdown';
const DEFAULT_TEXT = 'Please select';
const NO_SELECTION_TEXT = 'None';
const NO_SELECTION_VALUE = null;

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
  console.log('firstValue', firstValue);
  const [selectedValue, setSelectedValue] = useState(defaultOption.value || firstValue);
  const [displayText, setDisplayText] = useState(defaultOption.text || firstText);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = (e) => {
    if (!showMenu) {
      // e.stopPropagation();
      setShowMenu(true);

      // delay adding event listener, as otherwise current click event
      // will trigger this
      setTimeout(() => document.addEventListener('click', () => {
        setShowMenu(false);
      }, { once: true }));
    }
  };

  const onMenuChange = useCallback((text, children) => {
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
