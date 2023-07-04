import { DragEvent, MouseEvent, useContext, useEffect, useState } from "react";

import Form from "../Form/Form";
import Box from "../../components/ui/Box/Box";
import { EditionContext } from '../../store/edition-context';
import ControllersList from '../../components/ControllersList/ControllersList';

import css from './EditionPage.module.scss';
import FieldFactory, { FieldTypesEnum } from "../../components/FieldFactory/FieldFactory";
import FieldEditionContainer from "../../components/FieldFactory/FieldEditionContainer";
import Field, { APIFieldLoad } from "../../models/Field";
import useApi, { RequestTypeEnum } from "../../hooks/api-hook";
import StatusBar, { StatusBarTypeEnum } from "../../components/ui/StatusBar/StatusBar";

const EditionPage = () => {
    const [dragItem, setDragItem] = useState<number|null>(null);
    const [dragOverItem, setDragOverItem] = useState<number|null>(null);
    const [ currentDragItemId, setCurrentDragItemId ] = useState<string|null>(null)
    const [ status, setStatus ] = useState<StatusBarTypeEnum|null>(null);
    const { isLoading, error, sendRequest } = useApi();

    const editionContext = useContext(EditionContext);
    const { formId } = editionContext;


    useEffect(() => {
        if(!formId) return;

        sendRequest({url: 'http://local.woo.com/wp-json/mdf/v1/forms/' + (formId),
        }, async (response) => {
            const data: { 
                isNewRecord: boolean; 
                id:number; 
                form_name: string; 
                fields: APIFieldLoad[] } = await response.json();
            
                console.log(data);
            
            if(data.id) {
                editionContext.updateFormId(data.id);
                editionContext.updateFormTitle(data.form_name);

                data.fields.map(field => {
                    const loadedField = new Field(FieldTypesEnum.TEXT_FIELD, field.field_label, 'text');                    
                    loadedField.load(field);
                    editionContext.updateField(loadedField);
                });

                console.log(editionContext.fields);
            }
        })
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

    // const { isLoading, error, sendRequest } = useApi();

    const submitHandler = async (event:React.FormEvent) => {
        event.preventDefault();

        const bodyData = {
            name: editionContext.formTitle,
            fields: editionContext.fields.map(field => field.toJson())
        };

        console.log('submitHandler');

        sendRequest({
            url: 'http://local.woo.com/wp-json/mdf/v1/forms/' + (editionContext.formId || ''),
            body: bodyData,
            method: RequestTypeEnum.POST,
            headers: { 'Content-Type': 'application/json'}
        }, async (response) => {
            const data: {success: boolean; id?: number}  = await response.json();
            console.log(data);
            if(!editionContext.formId && data.id) editionContext.updateFormId(data.id);
        })

        setStatus(error ? StatusBarTypeEnum.ERROR : StatusBarTypeEnum.SUCCESS);
    };


    const closeStatusBarHandler = (event:MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        setStatus(null);
    }
    
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