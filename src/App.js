import './App.css';
import { Option, Dropdown } from './components';

const values = ['option-1', 'option-2'];
const labels = ['This is an option', 'This is another option'];

const values1 = ['option-1', 'option-2', 'option-3', 'option-4', 'option-5', 'option-6', 'option-7'];
const labels1 = ['1 second', '8 second', '15 second', '22 second', '29 second', '36 second', '43 second'];

const values2 = ['option-1', 'option-2', 'option-3'];
const labels2 = [
  'This is a clothing group', 'This is a food group', 'This is a movie group'
];

function App() {
  return (
    <div id="app-container">
      <div>React dropdown component</div>
      <br />
      <Dropdown enableSpecialSelectionOption label="Tag">
        {
          values1.map((value, i) => (
            <Option key={value} value={value}>{labels1[i]}</Option>
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
            values2.map((value, i) => (
              <Option key={value} value={value}>{labels2[i]}</Option>
            ))
          }
        </Dropdown>
    </div>
  );
}

export default App;
