<?php
/**
 * Returns a istance of a field
 *  
 * @since  1.0.0
 * @package MegustaDynamicForms
 * @subpackage MDF/Data/Models
 * @author Santiago Carmo <santiagocca@gmail.com>
 * 
 */

namespace MDF\Libs\Validations;

use MDF\Libs\Validations\MDFValidationException;
use MDF\Libs\Validations\MDFValidationExceptionType;

class MDFValidation {
    const REQUIRED = 'required';
    const MAX = 'max';
    const MIN = 'min';
    const EMAIL = 'email';

    private $_field;
    private $_value;
    private $_rule;
    private $_constraint;

    public function __construct(string $field, string $value, $rule, $constraint) {
        $this->_field = $field;
        $this->_value = $value;
        $this->_rule = $rule;
        $this->_constraint = $constraint;
    }

    public function validate() {
        if($this->_rule === self::REQUIRED) return self::validateRequired($this->_field, $this->_value);
        if($this->_rule === self::EMAIL) return self::validateEmailFormat($this->_field, $this->_value);
        if($this->_rule === self::MAX) return self::validateMax($this->_field, $this->_value, $this->_constraint);
        if($this->_rule === self::MIN) return self::validateMin($this->_field, $this->_value, $this->_constraint);
        return true;
    }

    //validations rules
    private static function validateMax($fieldName, $fieldValue, $length) {
        if(strlen($fieldValue) > $length)
            throw new MDFValidationException(new MDFValidationExceptionType(
                'Max size exceeded',
                $fieldName
            ));
        return true;
    }

    private static function validateMin($fieldName, $fieldValue, $length) {
        if(strlen($fieldValue) < $length) 
            throw new MDFValidationException(new MDFValidationExceptionType(
                'Min size exceeded',
                $fieldName
            ));
        return true;
    }

    private static function validateEmailFormat($fieldName, $fieldValue) {
        if(!filter_var($fieldValue, FILTER_VALIDATE_EMAIL)) 
            throw new MDFValidationException(new MDFValidationExceptionType(
                'Invalid email format',
                $fieldName
            ));
        return true;
    }

    private static function validateRequired($fieldName, $fieldValue) {
        if(empty(trim($fieldValue))) 
            throw new MDFValidationException(new MDFValidationExceptionType(
                "Required field",
                $fieldName
            ));
        return true;
    }
}