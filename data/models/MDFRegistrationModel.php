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
use \WP_REST_Response;
use MDF\Libs\MDFActiveRecord;
use MDF\Data\MDFDatabaseDefinition;
use MDF\Data\Models\MDFFormModel;
use MDF\Data\Models\MDFRegistrationValuesModel;
use MDF\Libs\Validations\MDFValidationException;
use MDF\Libs\Validations\MDFValidationExceptionType;

 class MDFRegistrationModel extends MDFActiveRecord {
    private $_errors;

    public function __construct() {
        parent::__construct();
        $this->tableName = MDFDatabaseDefinition::getTableName('form_registrations');
        $this->_errors = [];
    }
    
    public function save($format = []) {
        unset($this->data['isNewrecord']);
        $this->uuid = wp_generate_uuid4();

        $formModel = new MDFFormModel();

        try {
            if(!isset($this->data['fields']) || !is_array($this->fields) || count($this->fields) <= 0) {
                throw new MDFValidationException(
                    new MDFValidationExceptionType('Can\'t process your request'));
            }

            if(!$formModel->exists($this->data['form_id'])) {
                throw new MDFValidationException(
                    new MDFValidationExceptionType('Invalid form.'));
            }

            foreach($this->fields as $k => $field) {
                $this->validateFieldValues($field['field_id'], $field['field_value']);
            }            

        } catch(MDFValidationException $e) {
            array_push($this->_errors, $e->getDecodedMessage());
        }
        
        if(count($this->_errors) > 0) {
            return new WP_REST_Response($this->_errors, 422);
        }

        $regData = [
            'form_id' => $this->form_id,
            'uuid' => $this->uuid
        ];

        $success = $this->wpdb->insert($this->tableName, $regData, ['%d', '%s']);

        if($success) {
            foreach($this->fields as $k => $field) {
                $savedFieldValue = $this->createOrUpdateFieldValue($field, $this->uuid);
                $success = $success && !(false === $savedFieldValue);
             } 
        }

        return [ 'success' => $success, 'id' => $this->form_id ];
    }

    protected function createOrUpdateFieldValue($regData, $uuid) {
        $regData['registration_uuid'] = $uuid;
        $regModel = new MDFRegistrationValuesModel();
        $regModel->setParams($regData, false);
        return (!isset($regData['id']) ? $regModel->save() : $regModel->update());
    }

    protected function validateFieldValues($fieldId, $fieldValue) {
        $validationResult = MDFRegistrationValuesModel::validate($fieldId, $fieldValue);
        if(!$validationResult['valid']) {
            array_push($this->_errors, array_merge(['field_id' => $fieldId], $validationResult));
            return false;
        }

        return true;
    }

    public function update($format = []) {
        throw new Exception('Method not implemented yet');
    }

    public function delete($format = []) {
        throw new Exception('Method not implemented yet');
    }

    public static function getSchema() : array {
        return [
            '$schema' => 'http://json-schema.org/draft-04/schema#',
            'title' => 'Registration',
            'type' => 'object',
            'properties' => [
               'id' => [
                    'description' => __('The value database id'),
                    'type' => 'integer',
                    'context' => ['view', 'edit'],
                    'readonly' => true
               ],
               'uuid' => [
                    'description' => __('The registration identification. Ensures that each registration is unique.'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'form_id' => [
                    'description' => __('Identifies the form whose registration belongs to'),
                    'type' => 'integer',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'fields' => [
                    'description' => 'a list of form field values',
                    'type' => 'array',
                    'context' => ['view', 'edit'],
                    'items' => MDFRegistrationValuesModel::getSchema()
               ]
            ]
        ];
    }

    public static function getArgs() : array {
        return [
                'form_id' => [
                    'description' => __('Identifies the form whose value belongs to'),
                    'type' => 'integer',
                    'context' => ['view', 'edit'],
                    'readonly' => false,
                    'required' => true,
               ],
               'fields' => [
                    'description' => __('The list o registration fields values'),
                    'required' => true,
                    'type' => 'array',
                    'items' => MDFRegistrationValuesModel::getArgs() 
               ]
        ];
    }
 }