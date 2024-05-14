import { useState, useCallback } from 'react';
import { Menu, Option } from 'components';
import classNames from 'classnames';
import './Dropdown.css';

const DISPLAY_NAME = 'dropdown';
const NO_SELECTION_TEXT = 'None';

function Dropdown({
  id,
  name,
  children,
  defaultValue = null,
  enableNoSelection = false,
  noSelectionText = NO_SELECTION_TEXT,
}) {
  const [displayText, setDisplayText] = useState(NO_SELECTION_TEXT);
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

  const handleOptionClick = useCallback((text, children) => {
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
      <Menu show={showMenu} handleOptionClick={handleOptionClick}>
        {children}
      </Menu>
    </div>
  )
}

export default Dropdown;
