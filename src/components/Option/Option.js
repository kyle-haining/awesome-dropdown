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
    console.log('handlingClick');
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
      // onClick={handleClick}
    >
      {hasCheckbox ? (
        <label>
          <Checkbox value={value} checked={highlighted} onChange={handleClick} />
          {/* {text} */}
          <span>{text}</span>
        </label>
        ) : text
      }
    </div>
  )
}

export default Option;
