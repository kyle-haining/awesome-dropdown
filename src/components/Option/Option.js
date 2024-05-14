import { Checkbox } from 'components';
import classNames from 'classnames';
import './Option.css';

const DISPLAY_NAME = 'option';

function Option({
  value,
  highlighted,
  hasCheckbox,
  children,
  onMouseOver = () => {},
  onClick = () => {},
  ...rest
}) {
  const handleMouseOver = () => {
    onMouseOver(value);
  };

  const handleClick = () => {
    onClick(value, children);
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
          <Checkbox value={value} />
          {children}
        </label>
        ) : children
      }
    </div>
  )
}

export default Option;
