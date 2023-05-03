import css from './App.module.scss';

import Form from "./components/Form/Form";
import Box from "./components/ui/Box/Box";

function App() {
  return (
    <div className={css.app}>
        <Form />
        <div className={css['app__container']}>
          <Box className={css['app__stage']}>asdasd</Box>
          <Box className={css['app__controllers']}>asdasd</Box>
        </div>
    </div>
  );
}

export default App;
