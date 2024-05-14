import { useState, useCallback } from 'react';
import { Option } from 'components';
import classNames from 'classnames';
import './Dropdown.css';

const DISPLAY_NAME = 'dropdown';

function Dropdown({ id, name, value, children}) {
  const [displayText, setDisplayText] = useState('Select a value');
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = (e) => {
    if (!showMenu) {
      e.stopPropagation();
      setShowMenu(true);
      document.addEventListener('click', () => {
        setShowMenu(false);
      }, { once: true });
    }
  };

  const handleOptionClick = useCallback((text, children) => {
    setDisplayText(children);
  }, []);

  return (
    <>
      <button
        className={classNames(`${DISPLAY_NAME}-select`, { open: showMenu })}
        onClick={openMenu}
      >
        {displayText}
      </button>
      <div className={classNames(`${DISPLAY_NAME}-menu`, { hide: !showMenu })}>
        {children.map((Component) => (
          <Option
            {...Component.props}
            key={Component.props.value}
            onClick={handleOptionClick}
          >
            {Component.props.children}
          </Option>
        ))}
      </div>
    </>
  )
}

export default Dropdown;
