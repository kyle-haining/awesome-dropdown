import { useEffect, useRef } from 'react';
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
  const checkboxRef = useRef(null);

  const handleMouseOver = () => {
    onMouseOver(value);
  };

  const handleClick = (e) => {
    if (hasCheckbox) {
      checkboxRef.current.toggleCheck();
      console.log('handlingClick and stopping');
      // e.preventDefault();  // checkbox works if this is commented out. Sign works if this is made in.
      e.stopPropagation();
    }
    onClick(value, text);
  };

  // useEffect(() => {
  //   if (highlighted && checkboxRef.current) {
  //     console.log('effect running');
  //     checkboxRef.current.toggleCheck();
  //     // labelRef.current.checked = !labelRef.current.checked
  //   }
  // })

  return (
    <div
      {...rest}
      className={classNames(`${DISPLAY_NAME}-container`, { highlighted })}
      onMouseOver={handleMouseOver}
      onClick={(e) => { console.log('here2'); handleClick(e, true)}}
    >
      {hasCheckbox ? (
        <>
          <Checkbox ref={checkboxRef} value={value} />
          <span>{text}</span>
        </>
        ) : text
      }
    </div>
  )
}

export default Option;
