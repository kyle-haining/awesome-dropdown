import './Checkbox.css';

const DISPLAY_NAME = 'checkbox';

function Checkbox({ value }) {
  return (
    <input
      className={DISPLAY_NAME} 
      type="checkbox"
      value={value}
    />
  );
}

export default Checkbox;
