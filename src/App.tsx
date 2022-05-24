import './App.css';

import DarkPanel from './components/dark-panel/dark-panel'
import LightPanel from './components/light-panel/light-panel';

function App() {
  return (
    <div className='App'>
      <div className='main-container'>
        <LightPanel />
        <DarkPanel />
      </div>
    </div>
  );
}

export default App;