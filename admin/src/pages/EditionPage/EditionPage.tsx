import { DragEvent, MouseEvent, useContext, useEffect, useState } from "react";

import Form from "../Form/Form";
import Box from "../../components/ui/Box/Box";
import { EditionContext } from '../../store/edition-context';
import ControllersList from '../../components/ControllersList/ControllersList';

import css from './EditionPage.module.scss';
import FieldFactory, { FieldTypesEnum } from "../../components/FieldFactory/FieldFactory";
import FieldEditionContainer from "../../components/FieldFactory/FieldEditionContainer";
import Field, { APIFieldLoad } from "../../models/Field";
import useHttp, { RequestTypeEnum } from "../../hooks/http-hook";
import StatusBar, { StatusBarTypeEnum } from "../../components/ui/StatusBar/StatusBar";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/api-hook";

const EditionPage: React.FC<{ id:string|null }> = (props) => {
    const [dragItem, setDragItem] = useState<number|null>(null);
    const [dragOverItem, setDragOverItem] = useState<number|null>(null);
    const [ currentDragItemId, setCurrentDragItemId ] = useState<string|null>(null)
    const [ status, setStatus ] = useState<StatusBarTypeEnum|null>(null);
    const { sendRequest } = useHttp();
    const { isLoading, error, load, send, destroy } = useApi();
    const navigate = useNavigate();

    const editionContext = useContext(EditionContext);
    const formId = props.id;
    
    useEffect(() => {
        if(!formId) return editionContext.reset();
        editionContext.updateFormId(parseInt(formId));
        
        load(formId).then(data => {
            if(!data.id) return;
            editionContext.updateFormTitle(data.form_name);

            data.fields!.map(field => {
                const loadedField = new Field(field.field_type.toUpperCase() as FieldTypesEnum, field.field_label, field.field_type);
                loadedField.load(field);
                editionContext.updateField(loadedField);
            });
        });

    }, [formId]);

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

    const submitHandler = async (event:React.FormEvent) => {
        event.preventDefault();

        const bodyData = {
            name: editionContext.formTitle,
            fields: editionContext.fields.map(field => field.toJson())
        };

        send(editionContext.formId, bodyData).then( data => {
            if(!editionContext.formId && data.id) navigate(`?page=mdf&action=edit&formid=${data.id}`);
        })

        setStatus(error ? StatusBarTypeEnum.ERROR : StatusBarTypeEnum.SUCCESS);
    };

    const removeFieldHandler = (id: string) => {        
        if(!editionContext.formId || /[a-zA-Z]+/.test(id)) return editionContext.removeField(id);

        destroy(editionContext.formId, id).then(data => {
            if(data.id) editionContext.removeField(data.id.toString());
        });
    }

    const closeStatusBarHandler = (event:MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        setStatus(null);
    }

    const fields = editionContext.fields.sort((a, b) => a.position - b.position)
        .map((item, i) => 
            <FieldEditionContainer
                onRemove={removeFieldHandler.bind(null, item.id)}            
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
            { !error && status && <StatusBar onClick={closeStatusBarHandler} type={status} message="Sucesso!"/> }
            { error && status && <StatusBar onClick={closeStatusBarHandler} type={status} message={error}/> }
            <Form onSubmit={submitHandler} isLoading={isLoading}>
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