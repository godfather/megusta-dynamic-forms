import { DragEvent, useContext, useRef, useState } from "react";

import Form from "../../components/Form/Form";
import Box from "../../components/ui/Box/Box";
import { StageContext } from '../../store/stage-context';
import ControllersList from '../../components/ControllersList/ControllersList';

import css from './EditionPage.module.scss';

const EditionPage = () => {
    const stageContext = useContext(StageContext);
    const [dragItem, setDragItem] = useState<number|null>(null);
    const [dragOverItem, setDragOverItem] = useState<number|null>(null);
    const [ currentDragItemId, setCurrentDragItemId ] = useState<string|null>(null)
    // let currentElement: HTMLDivElement|null = null;
    

    // const [isDragging, setIsDraggin] = useState(false);

    // const dragStartHandle = (event:DragEvent<HTMLElement>) => {
    //     const element = event.target as HTMLDivElement;
    //     element.classList.add(css['edition-page__field--on-start-drag']);

    //     currentElement = element;
    //     event.dataTransfer.effectAllowed = 'move';
    //     event.dataTransfer.setData('', element.innerHTML);
    //     // setIsDraggin(true);
    // }

    const dragStartHandle = (event: DragEvent<HTMLDivElement>, fieldId: string, currentPosition: number) => {
        setCurrentDragItemId(fieldId);
        setDragItem(currentPosition);
        event.currentTarget.classList.add(css['edition-page__field--on-start-drag']);
    }

    const dragEndHandle = (event:DragEvent<HTMLDivElement>) => {
        stageContext.sortFields(currentDragItemId!, dragItem!, dragOverItem!);
        event.currentTarget.classList.remove(css['edition-page__field--on-start-drag'], css['edition-page__field--hover']);
    }

    // const dragOverHandle = (event:DragEvent<HTMLElement>) => {
    //     event.preventDefault();
    //     return false;
    // }

    // const dropHandle = (event:DragEvent<HTMLElement>) => {
    //     event.stopPropagation();
    //     const element = event.target as HTMLDivElement;

    //     if(currentElement && currentElement !== element) {
    //         currentElement!.innerHTML = element.innerHTML;
    //         element.innerHTML = event.dataTransfer.getData('');
    //         console.log(element.innerHTML);
    //         element.classList.remove(css['edition-page__field--on-start-drag'], css['edition-page__field--hover']);
    //     }
    
    //     return false;
    // }

    const dragEnterHandle = (event:DragEvent<HTMLDivElement>, position:number) => {
        setDragOverItem(position)
        event.currentTarget.classList.add(css['edition-page__field--hover']);
    }

    const dragLeaveHandle = (event:DragEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove(css['edition-page__field--hover']);
    }

    const fields = stageContext.fields.map((item, i) => 
        <div
            key={item.id} 
            className={css['edition-page__field']}
            onClick={stageContext.removeField.bind(null, item.id)}
            draggable="true"
            onDragStart={event => dragStartHandle(event, item.id, i)}
            onDragOver={event => event.preventDefault()}
            onDragEnter={event => dragEnterHandle(event, i)}
            onDragLeave={dragLeaveHandle}
            onDragEnd={dragEndHandle}>
                { item.label }
        </div>
    );
    
    return (
        <div className={css['edition-page']}>
            <Form>
              <div className={css['edition-page__container']}>
                <Box className={css['edition-page__stage']} title="Add Title">
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