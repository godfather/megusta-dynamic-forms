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

 class MDFFieldModel extends MDFActiveRecord {
    public function __construct() {
        parent::__construct();
        $this->tableName = "{$this->wpdb->prefix}megusta_dynamic_forms_fields";
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
                    'description' => __('The field database id'),
                    'type' => 'integer',
                    'context' => ['view', 'edit'],
                    'readonly' => true
               ],
               'position' => [
                    'description' => __('The position of the field on the form'),
                    'type' => 'integer',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_name' => [
                    'description' => __('Use this value on the html name attribute'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_type' => [
                    'description' => __('The html field type'),
                    'type' => 'string',
                    'enum' => self::getFieldTypes(),
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_label' => [
                    'description' => __('The label of the field'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_tip' => [
                    'description' => __('Use this value as a placeholder of a html field'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_validations' => [
                    'description' => __('A coma separated string to identify the field validations'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_options' => [
                    'description' => __('It stores the options of a dropdown, radio or checkbox groups'),
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                    'readonly' => false
               ],
               'field_css' => [
                    'description' => __('The css attributes that will be applyed to this field'),
                    'type' => 'string',
                    'context' => [ 'view', 'edit' ],
                    'readonly' => false
               ]
            ]
        ];
    }

    public static function getArgs() : array {
        return [
            'type' => 'object',
            'properties' => [
                'position' => [
                    'description' => __('The position of the field on the form'),
                    'type' => 'integer',
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'field_name' => [
                    'description' => __('Use this value on the html name attribute'),
                    'type' => 'string',
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'field_label' => [
                    'description' => __('The label of the field'),
                    'type' => 'string',
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'field_tip' => [
                    'description' => __('Use this value as a placeholder of a html field'),
                    'type' => 'string',
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'field_validations' => [
                    'description' => __('A coma separated string to identify the field validations'),
                    'type' => 'string',
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'field_options' => [
                    'description' => __('It stores the options of a dropdown, radio or checkbox groups'),
                    'type' => 'string',
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'field_type' => [
                    'description' => __('The html field type'),
                    'type' => 'string',
                    'enum' => self::getFieldTypes(),
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'field_css' => [
                    'description' => __('The css attributes that will be applyed to this field'),
                    'type' => 'string',
                    'required' => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ]
    
            ]
        ];
    }
 }