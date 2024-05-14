import './App.css';
import { useState } from 'react';
import { Checkbox, Option, Dropdown, SelectMenu, SelectDropdown } from './components';

const values = ['option-1', 'option-2'];
const labels = ['This is an option', 'This is another option'];

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <div id="app-container">
      <div>React component app</div>
      <br />
      <div style={{display: 'flex', gap: '8rem'}}>
        <Dropdown enableNoSelectionOption>
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
        <Dropdown defaultOption={{ value: values[1], text: labels[1] }}>
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
      </div>
      <br />
      <div style={{display: 'flex', gap: '8rem'}}>
        <SelectDropdown multiselect enableNoSelectionOption>
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </SelectDropdown>
        <Dropdown multiselect defaultOption={{ value: values[1], text: labels[1] }}>
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
      </div>
      {/* <div>Test</div> */}
    </div>
  );
}

export default App;
