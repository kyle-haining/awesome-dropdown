import './Checkbox.css';

const DISPLAY_NAME = 'checkbox';

function Checkbox({ value, checked }) {
  return (
    <input
      className={DISPLAY_NAME}
      type="checkbox"
      checked={checked}
    />
  );
}

export default Checkbox;
