import './App.css';
import { useState } from 'react';
import { Option, Dropdown } from './components';

const values = ['option-1', 'option-2'];
const labels = ['This is an option', 'This is another option'];

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <div id="app-container">
      <div>React component app</div>
      <br />
      <div style={{display: 'flex', gap: '8rem'}}>
        <Dropdown enableSpecialSelectionOption label="Tag">
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
        <Dropdown
          label="Age"
          defaultOption={{ value: values[1], text: labels[1] }}
        >
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
      </div>
      <br />
      <div style={{display: 'flex', gap: '8rem'}}>
        <Dropdown multiSelect enableSpecialSelectionOption>
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
        <Dropdown multiSelect defaultOption={{ value: values[1], text: labels[1] }}>
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
      </div>
    </div>
  );
}

export default App;
