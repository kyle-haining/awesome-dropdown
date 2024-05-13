import { Checkbox } from 'components';
import './Option.css';

const DISPLAY_NAME = 'option';

function Option({ id, name, value, onClick, children}) {
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
  return (
    <div
      id={id}
      className={DISPLAY_NAME}
      onClick={() => console.log('10')}
    >
      {children}
    </div>
  )
}

export default Option;
