import css from './App.module.scss';
import EditionPage from './pages/EditionPage/EditionPage';
import EditionContextProvider from './store/edition-context';

function App() {
  return (
    <EditionContextProvider>
      <div className={css.app}>
        <EditionPage />
      </div>
    </EditionContextProvider>
  );
}

export default App;
