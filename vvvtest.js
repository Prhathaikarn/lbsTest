import React, { useState, useEffect } from 'react';

function App() {
  const [inputData, setInputData] = useState('');
  const [dataList, setDataList] = useState([]);

  const fetchData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    setDataList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: inputData }),
    });

    setInputData('');
    fetchData();
  };

  return (
    <div className="text-center mt-[30%] w-auto">
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
          className="bg-slate-200 p-2 rounded-md"
        >
          Submit
        </button>
        <button
          onClick={fetchData}
          className="bg-slate-200 p-2 rounded-md"
        >
          Refresh
        </button>
      </div>
      <div className="pt-3 text-xl">
        <h1>
          Result:
          {dataList.map((item) => (
            <div key={item.id}>{item.data}</div>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default App;
