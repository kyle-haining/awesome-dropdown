import { Checkbox } from 'components';
import './Option.css';

const DISPLAY_NAME = 'option';

function Option({ id, name, value}) {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
    />
  );
}

export default Option;
