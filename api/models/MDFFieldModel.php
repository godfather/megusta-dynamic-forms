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
    
    // public static function validateField($fieldObject) {
    //     $valid = isset($fieldObject);
    //     if(!isset($fieldObject['type'])) return false;

    //     switch($fieldObject['type']) {
    //         case 'email': $valid &= is_email()
    //     }

    //     return $valid;
    // }
    
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
               'order' => [
                  'description' => 'the position of the field on the form',
                  'type' => 'integer',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'name' => [
                  'description' => 'use this value on the html name attribute',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'type' => [
                  'description' => 'the html field type',
                  'type' => 'string',
                  'enum' => self::getFieldTypes(),
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'label' => [
                  'description' => 'the label of the field',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'tip' => [
                  'description' => 'use this value as a placeholder of a html field',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'validations' => [
                  'description' => 'a coma separated string to identify the field validations',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'options' => [
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
                'order' => [
                    'description' => 'the position of the field on the form',
                    'type' => 'integer',
                    'required' => true,
                ],
                'name' => [
                    'description' => 'use this value on the html name attribute',
                    'type' => 'string',
                    'required' => true,
                ],
                'label' => [
                    'description' => 'the label of the field',
                    'type' => 'string',
                    'required' => true,
                ],
                'tip' => [
                    'description' => 'use this value as a placeholder of a html field',
                    'type' => 'string',
                    'required' => false
                ],
                'validations' => [
                    'description' => 'a coma separated string to identify the field validations',
                    'type' => 'string',
                    'required' => false,
                ],
                'options' => [
                    'description' => 'It stores the options of a dropdown, radio or checkbox groups',
                    'type' => 'string',
                    'required' => false,
                ],
                'type' => [
                    'description' => 'the html field type',
                    'type' => 'string',
                    'enum' => self::getFieldTypes(),
                    'required' => true
                ],
            ]
        ];
    }
 }