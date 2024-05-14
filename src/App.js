import './App.css';
import { Option, Dropdown } from './components';

const values = ['option-1', 'option-2'];
const labels = ['This is an option', 'This is another option'];

function App() {
  return (
    <div id="app-container">
      <div>React dropdown component</div>
      <br />
      <Dropdown enableSpecialSelectionOption label="Tag">
        {
          values.map((value, i) => (
            <Option key={value} value={value}>{labels[i]}</Option>
          ))
        }
      </Dropdown>
      <br />
      <br />
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
      <br />
      <br />
      <Dropdown multiSelect enableSpecialSelectionOption label="Groups">
          {
            values.map((value, i) => (
              <Option key={value} value={value}>{labels[i]}</Option>
            ))
          }
        </Dropdown>
    </div>
  );
}

export default App;
