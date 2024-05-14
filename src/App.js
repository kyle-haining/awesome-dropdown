import './App.css';
import { Checkbox, Option, Dropdown } from './components';

const values = ['option-1', 'option-2'];
const labels = ['This is an option', 'This is another option'];

function App() {
  return (
    <div id="app-container">
      <div>React component app</div>
      <br />
      <Dropdown>
        {
          values.map((value, i) => (
            <Option key={value} value={value}>{labels[i]}</Option>
          ))
        }
      </Dropdown>


      {/* <button onClick={() => console.log('10')}>10</button> */}
    </div>
  );
}

export default App;
