import './App.css';
import { Checkbox, Option, Dropdown } from './components';

const values = ['option-1', 'option-2'];
const labels = ['This is an option', 'This is another option'];

function App() {
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
        <Dropdown multiselect enableNoSelectionOption>
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
        <Dropdown multiselect defaultOption={{ value: values[1], text: labels[1] }}>
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
      </div>
      {/* <div>Test</div> */}


      {/* <button onClick={() => console.log('10')}>10</button> */}
    </div>
  );
}

export default App;
