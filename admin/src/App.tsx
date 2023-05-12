import css from './App.module.scss';
import EditionPage from './pages/EditionPage/EditionPage';
import StageContextProvider from './store/stage-context';

function App() {
  return (
    <StageContextProvider>
      <div className={css.app}>
        <EditionPage />
      </div>
    </StageContextProvider>
  );
}

export default App;
