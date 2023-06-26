import { DragEvent, useContext, useRef, useState } from "react";

import Form from "../Form/Form";
import Box from "../../components/ui/Box/Box";
import { EditionContext } from '../../store/edition-context';
import ControllersList from '../../components/ControllersList/ControllersList';

import css from './EditionPage.module.scss';
import FieldFactory from "../../components/FieldFactory/FieldFactory";
import FieldEditionContainer from "../../components/FieldFactory/FieldEditionContainer";
import Field from "../../models/Field";

const EditionPage = () => {
    const editionContext = useContext(EditionContext);
    const [dragItem, setDragItem] = useState<number|null>(null);
    const [dragOverItem, setDragOverItem] = useState<number|null>(null);
    const [ currentDragItemId, setCurrentDragItemId ] = useState<string|null>(null)

    const dragStartHandle = (event: DragEvent<HTMLDivElement>, fieldId: string, currentPosition: number) => {
        setCurrentDragItemId(fieldId);
        setDragItem(currentPosition);
        event.currentTarget.classList.add(css['edition-page__field--on-start-drag']);
    }

    const dragEndHandle = (event:DragEvent<HTMLDivElement>) => {
        editionContext.sortFields(currentDragItemId!, dragItem!, dragOverItem!);
        event.currentTarget.classList.remove(css['edition-page__field--on-start-drag'], css['edition-page__field--hover']);
    }

    const dragEnterHandle = (event:DragEvent<HTMLDivElement>, position:number) => {
        setDragOverItem(position)
        event.currentTarget.classList.add(css['edition-page__field--hover']);
    }

    const dragLeaveHandle = (event:DragEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove(css['edition-page__field--hover']);
    }

    const updateFieldHandler = (newField:Field): void  => {
        editionContext.updateField(newField);
    }

    const fields = editionContext.fields.map((item, i) => 
        <FieldEditionContainer
            onRemove={editionContext.removeField.bind(null, item.id)}            
            onDragStart={event => dragStartHandle(event, item.id, i)}
            onDragOver={event => event.preventDefault()}
            onDragEnter={event => dragEnterHandle(event, i)}
            onDragLeave={dragLeaveHandle}
            onDragEnd={dragEndHandle}
            field={item}
            onUpdate={updateFieldHandler}
            key={item.id}>
            <FieldFactory 
                fieldType={item.type}
                additionalProps={{ field:item }}
                editionMode={true} />
            </FieldEditionContainer>
    );
    
    return (
        <div className={css['edition-page']}>
            <Form>
              <div className={css['edition-page__container']}>
                <Box className={css['edition-page__stage']} title={editionContext.formTitle!}>
                    {fields.length > 0 ? fields : 'No fields' }
                </Box>
                <Box className={css['edition-page__controllers']} title='Fields'>
                    <ControllersList />
                  </Box>
              </div>
            </Form>
        </div>
    )
}

export default EditionPage;