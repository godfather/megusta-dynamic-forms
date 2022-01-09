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

use \Exception;
use MDFModels\MDFActiveRecord;
use MDFModels\MDFFieldModel;


 class MDFFormModel extends MDFActiveRecord {        
    public function __construct() {
        parent::__construct();
        $this->tableName = "{$this->wpdb->prefix}megusta_dynamic_forms";
    }
    
    public function get_fields($formId = NULL) {
      $formId = $formId ? $formId : $this->id;
      if($formId) {
         $fields = new MDFFieldModel();
         return $fields->findAll(['form_id' => '%d'], [$formId]);
      }
      return [];
    }

    private function createField($fieldData, $formId) {
        $fieldData['form_id'] = $formId;
        $fieldModel = new MDFFieldModel();
        $fieldModel->setParams($fieldData);
        return $fieldModel->save();
    }

    public function save( $format = []) {
        if(empty($this->data['name'])) throw new Exception('Form name cannot be empty!');
        
        $success = true;
        $data = ['form_name' => $this->name];
        $format = !empty($format) ? $format : ['%s'];
        $success = $success && $this->wpdb->insert($this->tableName, $data, $format);
        $formId = $this->wpdb->insert_id;

        if(is_array($this->data['fields']) && !empty($this->data['fields'])) {
           foreach($this->data['fields'] as $k => $field) {
               $success = $success && $this->createField($field, $formId);
            }
        }

        return $success;
    }

    public function find($id) {
      $form = parent::find($id);
      $form->fields = $this->get_fields();
      return $form;
    }
    
    public function delete($id = NULL) {
      $id = isset($id) ? $id : $this->id;
      $success = parent::delete($id);

      //deleting associated fields
      if($success) {
         $field = new MDFFieldModel();
         $success = $success && $field->deleteCollection(['form_id' => $id], ['%d']);
      }

      return $success;
    }

    public static function getSchema() : array {
        return [
            '$schema' => 'http://json-schema.org/draft-04/schema#',
            'title' => 'form',   
            'type' => 'object',
            'properties' => [
               'id' => [
                  'description' => 'the form id',
                  'type' => 'integer',
                  'context' => ['view', 'edit'],
                  'readonly' => true
               ],
               'name' => [
                  'description' => 'form name',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => false
               ],
               'created_at' => [
                  'description' => 'the form\'s creation date',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => true
               ],
               'updated_at' => [
                  'description' => 'the latest date when the form was updated',
                  'type' => 'string',
                  'context' => ['view', 'edit'],
                  'readonly' => true
               ],
               'fields' => [
                  'description' => 'a list of fields used to mount the form',
                  'type' => 'array',
                  'context' => ['view', 'edit'],
                  'items' => MDFFieldModel::getSchema()
               ]
            ]
        ];
    }

    public static function getArgs() : array {
        return [
            'name' => [
               'description' => __('The name that identifies the form.'),
               'type' => 'string',
               'required' => true,
               'format' => 'string'
               // 'validate_callback' => [ $this,  'validateCreateArgs'],
               // 'sanitize_callback' => [ $this,  'sanitizeCreateArgs'],
            ],
            'fields' => [
               'description' => __('A list of fields that forms the formulary'),
               'type' => 'array',
               'required' => true,
               'items' => MDFFieldModel::getArgs()
            ]
         ];
    }
 }