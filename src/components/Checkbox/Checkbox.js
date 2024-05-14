import { useState, forwardRef, useImperativeHandle } from 'react';
import './Checkbox.css';

const DISPLAY_NAME = 'checkbox';

const Checkbox = forwardRef(function ({ value, defaultChecked, onChange = () => {} }, ref) {
  const [checked, setChecked] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      toggleCheck: () => {
        setChecked(!checked);
      }
    };
  });

  return (
    // <div className={`${DISPLAY_NAME}-container`} onClick={(e) => {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   console.log('click div')
    // }}>
      <input
        className={DISPLAY_NAME}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
    // </div>
  );
});

export default Checkbox;
