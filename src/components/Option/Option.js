import { Checkbox } from 'components';
import classNames from 'classnames';
import './Option.css';

const DISPLAY_NAME = 'option';

function Option({
  value,
  highlighted,
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

  // return (
  //   <option>
  //     <>
  //       <Checkbox id={`${id}-checkbox`} />
  //       <label className={`${DISPLAY_NAME}-label`} for={`${id}-checkbox`} >
  //         {children}
  //       </label>
  //     </>
  //   </option>
  // );
  console.log('render Option!');
  return (
    <div
      {...rest}
      className={classNames(`${DISPLAY_NAME}-container`, { highlighted })}
      onMouseOver={handleMouseOver}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default Option;
