import './Checkbox.css';

const DISPLAY_NAME = 'checkbox';

function Checkbox({ value, checked, onChange }) {
  return (
    <input
      className={DISPLAY_NAME}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
}

export default Checkbox;
