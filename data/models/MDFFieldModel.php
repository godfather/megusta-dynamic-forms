<?php
/**
 * Returns a istance of a field
 *  
 * @since  1.0.0
 * @package MegustaDynamicForms
 * @subpackage MegustaDynamicForms/api/models
 * @author Santiago Carmo <santiagocca@gmail.com>
 * 
 */

namespace MDFModels;

use MDFModels\MDFActiveRecord;

 class MDFFieldModel extends MDFActiveRecord {
    public function __construct() {
        parent::__construct();
        $this->tableName = "{$this->wpdb->prefix}megusta_dynamic_forms_fields";
    }
    
    public static function translateColumnNames() {
        
    }

    public function save($format = []) {
        unset($this->data['isNewrecord']);
        return $this->wpdb->insert($this->tableName, $this->data, $format);
    }

    public function update($format = []) {
        unset($this->data['isNewrecord']);
        return $this->wpdb->update($this->tableName, $this->data, [
            'id' => $this->id, 
            'form_id' => $this->form_id
        ], $format, ['%d', '%d']);
    }

    public static function getFieldTypes() {
        return [
            'text',
            'email',
            'date',
            'number',
            'password',
            'date',
            'datetime',
            'file',
            'hidden',
            'radiogroup',
            'checkboxgroup'
        ];
     }


    public static function getSchema() : array {
        return [
            'type' => 'object',
            'properties' => [
               'id' => [
                  'description' => 'the field database id',
                  'type' => 'integer',
                  'context' => ['view', 'edit'],
                  'readonly' => true
               ],
               'position' => [
                  'description' => 'the position of the field on the form',
                  'type' => 'integer',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'field_name' => [
                  'description' => 'use this value on the html name attribute',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'field_type' => [
                  'description' => 'the html field type',
                  'type' => 'string',
                  'enum' => self::getFieldTypes(),
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'field_label' => [
                  'description' => 'the label of the field',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'field_tip' => [
                  'description' => 'use this value as a placeholder of a html field',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'field_validations' => [
                  'description' => 'a coma separated string to identify the field validations',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'field_options' => [
                  'description' => 'It stores the options of a dropdown, radio or checkbox groups',
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
                'position' => [
                    'description' => 'the position of the field on the form',
                    'type' => 'integer',
                    'required' => true,
                ],
                'field_name' => [
                    'description' => 'use this value on the html name attribute',
                    'type' => 'string',
                    'required' => true,
                ],
                'field_label' => [
                    'description' => 'the label of the field',
                    'type' => 'string',
                    'required' => true,
                ],
                'field_tip' => [
                    'description' => 'use this value as a placeholder of a html field',
                    'type' => 'string',
                    'required' => false
                ],
                'field_validations' => [
                    'description' => 'a coma separated string to identify the field validations',
                    'type' => 'string',
                    'required' => false,
                ],
                'field_options' => [
                    'description' => 'It stores the options of a dropdown, radio or checkbox groups',
                    'type' => 'string',
                    'required' => false,
                ],
                'field_type' => [
                    'description' => 'the html field type',
                    'type' => 'string',
                    'enum' => self::getFieldTypes(),
                    'required' => true
                ],
            ]
        ];
    }
 }