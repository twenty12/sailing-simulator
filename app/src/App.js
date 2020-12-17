import './App.css';
import Ocean from './Ocean'

function App() {

  return (
    <div style={{
        userSelect: 'none'
    }} className="App ocean">
        <Ocean />
        {/* <SailBoat style={{left: 60}}/> */}
    </div>
  );
}

export default App;
