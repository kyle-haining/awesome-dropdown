import { Option } from 'components';
import './Dropdown.css';

const DISPLAY_NAME = 'dropdown';

function Dropdown({ id, name, value, children}) {
  return (
    <>
      <div className={`${DISPLAY_NAME}-select`}>
        Select
      </div>
      <div className={`${DISPLAY_NAME}-menu`}>
        {children}
      </div>
    </>
  )
}

export default Dropdown;
