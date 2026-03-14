import { useState } from 'react';
import './App.scss';
import Graph from './Graph';
import Slider from './Slider';

function App() {
  const [pctg, setPctg] = useState(0);

  return (
    <div className={'container'}>
      <h1>siksakki</h1>
      <Graph pctg={pctg} />
      <Slider pctg={pctg} setPctg={setPctg} />
    </div>
  );
}

export default App;
