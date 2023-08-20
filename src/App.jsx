import { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState([]);

  const handleSubmit = () => {
    axios
      .post('http://localhost:8888/data/add', {
        text: inputData,
      })
      .then((rs) => {
        setResult(rs.data);
      })
      .catch((rs) => {
        setResult([{ id: 0, text: 'Server Error!' }]);
      });
  };

  const handleRefresh = () => {
    axios
      .get('http://localhost:8888/data/')
      .then((rs) => {
        setResult(rs.data);
      })
      .catch((rs) => {
        setResult([{ id: 0, text: 'Server Error!' }]);
      });
  };

  const showResult = result.map((item) => <div key={item.id}>{item.text}</div>);

  return (
    <div className="text-center mt-[10%] w-auto">
      <h1 className="p-2 font-bold text-2xl">LBS-Test</h1>
      <input
        className="border rounded-md m-5 p-3"
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter data"
      />
      <div className="flex justify-center gap-4">
        <button
          onClick={handleSubmit}
          className="bg-slate-200 p-2 rounded-md hover:bg-slate-400"
        >
          Submit
        </button>
        <button
          onClick={handleRefresh}
          className="bg-slate-200 p-2 rounded-md hover:bg-slate-400"
        >
          Refresh
        </button>
      </div>
      <div className="pt-3 text-xl">
        <h1>Result: {showResult}</h1>
      </div>
    </div>
  );
}

export default App;
