import './Checkbox.css';

const DISPLAY_NAME = 'checkbox';

function Checkbox({ value }) {
  return (
    <input
      className={DISPLAY_NAME}
      type="checkbox"
    />
  );
}

export default Checkbox;
