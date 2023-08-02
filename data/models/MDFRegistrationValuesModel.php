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

 class MDFRegistrationValuesModel extends MDFActiveRecord {
    public function __construct() {
        parent::__construct();
        $this->tableName = MDFDatabaseDefinition::getTableName('form_registration_values');
    }
    
    public function save($format = []) {
        unset($this->data['isNewrecord']);
        return $this->wpdb->insert($this->tableName, $this->data, $format);
    }


    public function update($format = []) {
        unset($this->data['isNewrecord']);
        $this->data['updated_at'] = date('Y-m-d H:I:s');
        return $this->wpdb->update($this->tableName, $this->data, [
            'id' => $this->id, 
            'field_id' => $this->field_id,
            'registration_uuid' => $this->registration_uuid
        ], $format, ['%d', '%d', '%s']);
    }

    public function delete($id = NULL) {
        $id = isset($id) ? $id : $this->id;
        $success = parent::delete($id);  
        return $success;
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