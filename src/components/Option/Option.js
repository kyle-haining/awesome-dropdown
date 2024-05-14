import { Checkbox } from 'components';
import classNames from 'classnames';
import './Option.css';

const DISPLAY_NAME = 'option';

function Option({
  value,
  highlighted,
  hasCheckbox,
  children: text,
  onMouseOver = () => {},
  onClick = () => {},
  ...rest
}) {
  const handleMouseOver = () => {
    onMouseOver(value);
  };

  const handleClick = (e) => {
    if (hasCheckbox) {
      e.stopPropagation();
    }
    onClick(value, text);
  };

  return (
    <div
      {...rest}
      className={classNames(`${DISPLAY_NAME}-container`, { highlighted })}
      onMouseOver={handleMouseOver}
      onClick={handleClick}
    >
      {hasCheckbox ? (
        <label>
          <Checkbox value={value} checked={highlighted} />
          {text}
        </label>
        ) : text
      }
    </div>
  )
}

export default Option;
