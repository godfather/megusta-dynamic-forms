import { useContext } from "react";
import { EditionContext } from "../../store/edition-context";
import Field from "../../models/Field";
import Button, { ButtonStyle } from "../ui/Button/Button";
import { FieldTypesEnum } from "../FieldFactory/FieldFactory";
import { FieldBaseType } from "../../models/Field";

const DUMMY_FIELD_TYPES_LIST = [
    {type: FieldTypesEnum.TEXT_FIELD, label: 'Text Field', htmlType: 'text'},
    {type: FieldTypesEnum.EMAIL, label: 'E-mail', htmlType: 'email'},
    {type: FieldTypesEnum.TEXTAREA, label: 'Textarea', htmlType: 'textarea'},
    {type: FieldTypesEnum.CHECKBOX, label: 'Checkbox', htmlType: 'checkbox'},
    {type: FieldTypesEnum.CHECKBOX_GROUP, label: 'Checkbox Group', htmlType: 'checkboxGroup'},
    {type: FieldTypesEnum.RADIO_GROUP, label: 'Radio Group', htmlType: 'radio'},
    {type: FieldTypesEnum.FILE, label: 'File', htmlType: 'file'},
];

const ControllersList = () => {
    const editionContext = useContext(EditionContext);

    const clickHandler = (field:FieldBaseType) => {
        editionContext.addField(field);
    }
    
    const buttonFields = DUMMY_FIELD_TYPES_LIST.map(item => 
        <Button
          key={item.type}
          clickHandler={clickHandler.bind(null, item)}
          type={item.type}
          style={ButtonStyle.BIG_DEFAULT}>
          {item.label}
        </Button>
      );

    return(
        <>{ buttonFields }</>
    )
}

export default ControllersList;