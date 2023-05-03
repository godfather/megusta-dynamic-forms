import css from './App.module.scss';

import Form from "./components/Form/Form";
import Box from "./components/ui/Box/Box";
import Button from './components/ui/Button/Button';

function App() {
  return (
    <div className={css.app}>
        <Form />
        <div className={css['app__container']}>
          <Box className={css['app__stage']} title="Add Title">asdasd</Box>
          <Box className={css['app__controllers']} title='Fields'>
            <Button>Text Field</Button>
          </Box>
        </div>
    </div>
  );
}

export default App;
