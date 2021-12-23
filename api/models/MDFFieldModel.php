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

 require_once dirname(__FILE__) . '/MDFActiveRecord.php';

 class MDFFieldModel extends MDFActiveRecord {
    public function __construct() {
    }
    
    public function createField() {

    }

    public static function translateColumnNames() {
        
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


    public static function getFieldScheme() {
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

    public static function getFieldArgs() {
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