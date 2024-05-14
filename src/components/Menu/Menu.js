import { useState, useCallback } from 'react';
import { Option } from 'components';
import classNames from 'classnames';
import './Menu.css';

const DISPLAY_NAME = 'menu';
const NO_SELECTION_TEXT = 'None';

function Menu({
  id,
  name,
  show,
  handleOptionClick,
  children,
  defaultValue = null,
  enableNoSelection = false,
  noSelectionText = NO_SELECTION_TEXT,
}) {
  return (
    <div className={classNames(`${DISPLAY_NAME}-container`, { hide: !show })}>
      {enableNoSelection && (
        <Option value={null} onClick={handleOptionClick}>
          <em>{noSelectionText}</em>
        </Option>
      )}
      {children.map((Component) => (
        <Option
          {...Component.props}
          key={Component.props.value}
          onClick={handleOptionClick}
        >
          {Component.props.children}
        </Option>
      ))}
    </div>
  )
}

export default Menu;
