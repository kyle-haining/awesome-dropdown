import './Checkbox.css';

const DISPLAY_NAME = 'checkbox';

function Checkbox({ id, name, value}) {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
    />
  );
}

export default Checkbox;
