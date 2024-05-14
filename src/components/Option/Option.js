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
  const textId = `${DISPLAY_NAME}-${value}-text`;

  const handleMouseOver = () => {
    onMouseOver(value);
  };

  const handleClick = (e) => {
    if (hasCheckbox) {
      // checkboxRef.current.toggleCheck();
      e.stopPropagation();
    }
    onClick(value, text);
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.toggleCheck();
    }
  }, [highlighted, checkboxRef])

  return (
    <div
      {...rest}
      className={classNames(`${DISPLAY_NAME}-container`, { highlighted })}
      onMouseOver={handleMouseOver}
      onClick={handleClick}
    >
      {hasCheckbox ? (
        <>
          <Checkbox ref={checkboxRef} ariaLabeledBy={textId} />
          <span id={textId}>{text}</span>
        </>
        ) : text
      }
    </div>
  )
}

export default Option;
