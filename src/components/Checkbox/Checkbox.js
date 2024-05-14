import { useState, useImperativeHandle, forwardRef } from 'react';
import './Checkbox.css';

const DISPLAY_NAME = 'checkbox';

const Checkbox = forwardRef(function ({ ariaLabeledBy }, ref) {
  const [checked, setChecked] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      toggleCheck: () => {
        setChecked(!checked);
      }
    };
  });

  return (
    <input
      className={DISPLAY_NAME}
      aria-labelledby={ariaLabeledBy}
      readOnly
      type="checkbox"
      checked={checked}
    />
  );
});

export default Checkbox;
