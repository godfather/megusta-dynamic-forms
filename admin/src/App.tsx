import { useContext } from 'react';
import css from './App.module.scss';

import Form from "./components/Form/Form";
import Box from "./components/ui/Box/Box";
import { StageContext } from './store/stage-context';
import ControllersList from './components/ControllersList/ControllersList';


function App() {
  const stageContext = useContext(StageContext);
  
  const fields = stageContext.fields.map(item => <p key={item.id}>{ item.label }</p>);

  return (
    <div className={css.app}>        
        <Form>
          <div className={css['app__container']}>
              <Box className={css['app__stage']} title="Add Title">{fields.length > 0 ? fields : 'No fields' }</Box>
              <Box className={css['app__controllers']} title='Fields'>
                <ControllersList />
              </Box>
          </div>
        </Form>
    </div>
  );
}

export default App;
