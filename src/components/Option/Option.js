import { Checkbox } from 'components';
import './Option.css';

const DISPLAY_NAME = 'option';

function Option({ value, children, onClick = () => {}, ...rest }) {
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
      className={DISPLAY_NAME}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default Option;
