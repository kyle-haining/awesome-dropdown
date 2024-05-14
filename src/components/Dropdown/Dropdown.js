import { useState } from 'react';
import { Option } from 'components';
import classNames from 'classnames';
import './Dropdown.css';

const DISPLAY_NAME = 'dropdown';

function Dropdown({ id, name, value, children}) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {

    if (!showMenu) {
      setShowMenu(true);
      e.stopPropagation();
      document.addEventListener('click', () => {
        setShowMenu(false);
        console.log('clicked');
      }, { once: true });
    }
  };

  return (
    <>
      <div
        className={`${DISPLAY_NAME}-select`}
        onClick={toggleMenu}
      >
        Select
      </div>
      <div className={classNames(`${DISPLAY_NAME}-menu`, { hide: !showMenu })}>
        {children}
      </div>
    </>
  )
}

export default Dropdown;
