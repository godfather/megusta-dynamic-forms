import React, { PropsWithChildren, useContext } from "react";

import Form from "../../components/Form/Form";
import Box from "../../components/ui/Box/Box";
import { StageContext } from '../../store/stage-context';
import ControllersList from '../../components/ControllersList/ControllersList';

import css from './EditionPage.module.scss';

const EditionPage = () => {
    const stageContext = useContext(StageContext);
  
    const fields = stageContext.fields.map(item => <p key={item.id}>{ item.label }</p>);
    
    return (
        <div className={css['edition-page']}>
            <Form>
              <div className={css['edition-page__container']}>
                <Box className={css['edition-page__stage']} title="Add Title">{fields.length > 0 ? fields : 'No fields' }</Box>
                <Box className={css['edition-page__controllers']} title='Fields'>
                    <ControllersList />
                  </Box>
              </div>
            </Form>
        </div>
    )
}

export default EditionPage;