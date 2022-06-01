import { useEffect, useState } from 'react';
import './App.css';
import logo from './imgs/loading.svg';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?count=5&api_key=${API_KEY}`;

  const [loadingAct, setLoadingAct] = useState(true);
  const [item, setItem] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const fetchData = async () => {
    setLoadingAct(true);
    const response = await fetch(url);
    const data = await response.json();
    setLoadingAct(false);
    setItem(data);
  };

  const filterBtn = (title) => {
    const newItem = item.filter((del) => del.title !== title);
    setItem(newItem);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loadingAct) {
    return (
      <img
        className="flex justify-center items-center w-screen h-screen"
        src={logo}
        alt="loading"
      />
    );
  }

  return (
    <>
      <h1 className="text-center text-3xl mt-8 mb-5 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-200">
        COSMOS
      </h1>
      <span className="flex bg-white h-2 w-48 mb-10 mx-auto bg-gradient-to-r from-indigo-800 via-sky-600"></span>
      {item.length === 0 && (
        <div className="flex flex-col flex justify-center items-center">
          <p className="text-center text-xl mt-8 mb-5 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-200">
            There is nothing left...
          </p>
          <button
            onClick={fetchData}
            className="w-1/2 px-24 py-3 bg-slate-300 bg-gradient-to-r from-zinc-400 via-zinc-200 border-0 hover:bg-cyan-400"
          >
            REFRESH?
          </button>
        </div>
      )}
      {item.map((data, index) => {
        const { date, url, title, explanation } = data;
        return (
          <div
            key={index}
            className="flex flex-col bg-slate-300 w-1/2 h-1/2 mx-auto my-5 rounded-3xl overflow-hidden"
          >
            <img src={url} alt={title} />
            <header className="flex my-5 justify-between mx-5">
              <h2 className="font-bold">{title}</h2>
              <h2 className="italic">{date}</h2>
            </header>
            <p className="mx-10">
              {readMore ? explanation : `${explanation.substring(0, 200)}...`}
              <button
                onClick={() => setReadMore(!readMore)}
                className="text-sky-900"
              >
                {readMore ? 'Show Less' : 'Read More'}
              </button>
            </p>
            <button
              onClick={() => filterBtn(title)}
              className="mx-auto border border-sky-500 my-10 w-1/2"
            >
              Remove This Content
            </button>
          </div>
        );
      })}
      {item.length !== 0 && (
        <div className="flex flex-col flex justify-center items-center">
          <button
            onClick={fetchData}
            className="w-1/2 px-24 py-3 mb-12 mt-8 bg-slate-300 bg-gradient-to-r from-zinc-400 via-zinc-200 border-0 hover:bg-cyan-400 "
          >
            REFRESH?
          </button>
        </div>
      )}
    </>
  );
}

export default App;
