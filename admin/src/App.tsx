import css from './App.module.scss';
import EditionContextProvider from './store/edition-context';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';

function App() {
  return (
    <EditionContextProvider>
      <div className={css.app}>
        <RouterProvider router={router} />
      </div>
    </EditionContextProvider>
  );
}

export default App;
