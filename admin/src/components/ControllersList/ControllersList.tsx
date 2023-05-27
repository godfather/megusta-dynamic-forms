import { useContext } from "react";
import { StageContext } from "../../store/stage-context";
import Field from "../../models/Field";
import Button, { ButtonStyle } from "../ui/Button/Button";
import { FieldTypesEnum } from "../FieldFactory/FieldFactory";
import { FieldBaseType } from "../../models/Field";

const DUMMY_FIELD_TYPES_LIST = [
    {type: FieldTypesEnum.TEXT_FIELD, label: 'Text Field', htmlType: 'text'},
    {type: FieldTypesEnum.TEXTAREA, label: 'Textarea', htmlType: 'textarea'},
];

const ControllersList = () => {
    const stageContext = useContext(StageContext);

    const clickHandler = (field:FieldBaseType) => {
        stageContext.addField(field);
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