import './App.css';
import SailBoat from './SailBoat'

function App() {
  return (
    <div className="App ocean">
        <SailBoat />
        <SailBoat style={{left: 60}}/>
    </div>
  );
}

export default App;
