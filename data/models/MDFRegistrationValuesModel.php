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

namespace MDF\Data\Models;

use \Exception;
use MDF\Libs\MDFActiveRecord;
use MDF\Data\MDFDatabaseDefinition;
use MDF\Data\Models\MDFFieldModel;
use MDF\Libs\Validations\MDFValidationException;
use MDF\Libs\Validations\MDFValidationExceptionType;
use MDF\Libs\Validations\MDFValidation;

 class MDFRegistrationValuesModel extends MDFActiveRecord {
    public function __construct() {
        parent::__construct();
        $this->tableName = MDFDatabaseDefinition::getTableName('form_registration_values');
    }
    
    public function save($format = []) {
        unset($this->data['isNewrecord']);
        // $validationResult = self::validate($field['field_id'], $field['field_value']);
        // if(!$validationResult['valid']) return $validationResult;

        //check if form exists
        //check if each field exists before save
        //validate fields
        //save

        return $this->wpdb->insert($this->tableName, $this->data, $format);
    }


    public function update($format = []) {
        throw new Exception('Not implemented');
        // unset($this->data['isNewrecord']);
        // $this->data['updated_at'] = date('Y-m-d H:I:s');
        // return $this->wpdb->update($this->tableName, $this->data, [
        //     'id' => $this->id, 
        //     'field_id' => $this->field_id,
        //     'registration_uuid' => $this->registration_uuid
        // ], $format, ['%d', '%d', '%s']);
    }

    public function delete($id = NULL) {
        throw new Exception('Not implemented');

        // $id = isset($id) ? $id : $this->id;
        // $success = parent::delete($id);  
        // return $success;
    }


    //TODO: refactor using error accumulator
    //ref: https://betterprogramming.pub/a-php-pattern-to-avoid-try-catch-blocks-repetition-1e3fe2038dc1
    public static function validate($fieldId, $fieldValue) {
        $errors = [];
        
        try {            
            $fieldModel = new MDFFieldModel();            

            if(!$fieldModel->exists($fieldId)) {
                throw new MDFValidationException(new MDFValidationExceptionType(
                    "Invalid field"
                ));
            }

            $fieldModel = $fieldModel->find($fieldId);
            $rules = $fieldModel->getValidationRules();

            foreach($rules as $rule => $constraint) {
                try {
                    $validator = new MDFValidation(
                        $fieldModel->field_name,
                        $fieldValue,
                        $rule,
                        $constraint
                    );

                    $validator->validate();
                } catch(MDFValidationException $e) {
                    array_push($errors, $e->getDecodedMessage());        
                }
            }
        } catch(MDFValidationException $e) {
            array_push($errors, $e->getDecodedMessage());
        }

        return [ 'valid' => count($errors) <= 0, 'errors' => $errors ];
    }

    public static function getSchema() : array {
        return [
            '$schema' => 'http://json-schema.org/draft-04/schema#',
            'title' => 'Registration Value',
            'type' => 'object',
            'properties' => [
               'id' => [
                    'description' => __('The value database id'),
                    'type' => 'integer',
                    'context' => ['view', 'edit'],
                    'readonly' => true
               ],
               'registration_uuid' => [
                    'description' => __('The registration identification. Ensures that the field belongs to an unique registration.'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_id' => [
                    'description' => __('Identifies the field whose value belongs to'),
                    'type' => 'integer',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_value' => [
                    'description' => __('The field value'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
            ]
        ];
    }

    public static function getArgs() : array {
        return [
            'type' => 'object',
            'properties' => [
                'field_id' => [
                    'description' => __('Identifies the field whose value belongs to'),
                    'type' => 'integer',
                    'context' => ['view', 'edit'],
                    'readonly' => false,
                    'required' => true,
               ],
               'field_value' => [
                    'description' => __('The field value'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false,
                    'required' => true,
               ]    
            ]
        ];
    }
 }