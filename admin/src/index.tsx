import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StageContextProvider from './store/stage-context';

const root = ReactDOM.createRoot(
  document.getElementById('mdf-root') as HTMLElement
);
root.render(<App />);

document.getElementById('wpfooter')!.style.position = 'relative';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
