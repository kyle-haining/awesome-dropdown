import './App.css';
import { Checkbox, Option, Dropdown } from './components';

function App() {
  return (
    <div id="app-container">
      <div>React component app</div>
      <Dropdown>
        <Option id="option-1" >This is an option</Option>
        <Option id="option-2" >This is another option</Option>
      </Dropdown>


      {/* <button onClick={() => console.log('10')}>10</button> */}
    </div>
  );
}

export default App;
