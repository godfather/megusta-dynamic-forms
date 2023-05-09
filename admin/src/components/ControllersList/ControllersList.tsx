import { useContext } from "react";
import { StageContext } from "../../store/stage-context";
import Field, { FieldTypesEnum } from "../../models/Field";
import Button, { ButtonStyle } from "../ui/Button/Button";

const DUMMY_FIELD_TYPES_LIST = [
    new Field(FieldTypesEnum.TEXT_FIELD, 'Text Field', 'text'),
    new Field(FieldTypesEnum.TEXTAREA, 'Textarea', 'textarea'),
];

const ControllersList = () => {
    const stageContext = useContext(StageContext);

    const clickHandler = (fieldType:string) => {
        stageContext.addField(fieldType);
    }
    
    const buttonFields = DUMMY_FIELD_TYPES_LIST.map(item => 
        <Button
          key={item.type}
          clickHandler={clickHandler.bind(null, item.type)}
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