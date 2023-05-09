import { useContext } from 'react';
import css from './App.module.scss';

import Form from "./components/Form/Form";
import Box from "./components/ui/Box/Box";
import { StageContext } from './store/stage-context';
import ControllersList from './components/ControllersList/ControllersList';


function App() {
  const stageContext = useContext(StageContext);
  
  return (
    <div className={css.app}>        
        <Form>
          <div className={css['app__container']}>
              <Box className={css['app__stage']} title="Add Title">asdasd</Box>
              <Box className={css['app__controllers']} title='Fields'>
                <ControllersList />
              </Box>
          </div>
        </Form>
    </div>
  );
}

export default App;
