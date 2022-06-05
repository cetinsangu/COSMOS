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
        <div className="container mx-auto flex flex-col justify-center items-center">
          <p className="text-xl mt-8 mb-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-900 to-sky-200">
            There is nothing left...
          </p>
          <button
            onClick={fetchData}
            className="px-24 py-3 text-white bg-gradient-to-r from-sky-900 to-sky-400 border-0 hover:from-sky-400 to-sky-900 transition-colors"
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
            className="container mx-auto flex flex-col justify-center  bg-slate-300 my-8 rounded-3xl overflow-hidden"
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
              className="border border-sky-500 my-10 w-1/2 mx-auto"
            >
              Remove This Content
            </button>
          </div>
        );
      })}
      {item.length !== 0 && (
        <button
          onClick={fetchData}
          className="flex justify-center items-center mx-auto w-1/2 px-24 py-3 my-10 text-white bg-gradient-to-r from-sky-900 to-sky-400 border-0 hover:from-sky-400 to-sky-900"
        >
          REFRESH?
        </button>
      )}
    </>
  );
}

export default App;
