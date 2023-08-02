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
use MDF\Data\Models\MDFRegistrationValuesModel;

 class MDFRegistrationModel extends MDFActiveRecord {
    public function __construct() {
        parent::__construct();
        $this->tableName = MDFDatabaseDefinition::getTableName('form_registrations');
    }
    
    public function save($format = []) {
        unset($this->data['isNewrecord']);
        $this->uuid = wp_generate_uuid4();
        
        if(!isset($this->data['fields']) || !is_array($this->fields) || count($this->fields) <= 0) {
            return new WP_REST_Response(array('error' => 'Can\'t process your request'), 422);
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

    public function update($format = []) {
        throw new Exception('Method not implemented yet');
    }

    public function delete($format = []) {
        throw new Exception('Method not implemented yet');
    }
    // public function update($format = []) {
    //     unset($this->data['isNewrecord']);
    //     $this->data['updated_at'] = date('Y-m-d H:I:s');
    //     return $this->wpdb->update($this->tableName, $this->data, [
    //         'id' => $this->id, 
    //         'field_id' => $this->field_id,
    //         'registration_uuid' => $this->registration_uuid
    //     ], $format, ['%d', '%d', '%s']);
    // }

    // public function delete($id = NULL) {
    //     $id = isset($id) ? $id : $this->id;
    //     $success = parent::delete($id);  
    //     return $success;
    // }

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