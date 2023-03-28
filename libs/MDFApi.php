<?php

/**
 * Responsible for all ajax admin requests
 *  
 * @since  1.0.0
 * @package MegustaDynamicForms
 * @subpackage MDF/Libs
 * @author Santiago Carmo <santiagocca@gmail.com>
 * 
 */


 namespace MDF\Libs;

 use \WP_REST_Controller;
 use \WP_REST_Server;
 use \WP_REST_Request;
 use MDF\Data\Models\MDFFormModel;
 use MDF\Data\Models\MDFFieldModel;

 class MDFApi extends WP_REST_Controller {
    const API_NAMESPACE = 'mdf';
    const API_VERSION = 'v1';
    const NAMESPACE = self::API_NAMESPACE . '/' . self::API_VERSION;
    const ENDPOINT = 'forms';

    private $_schema;

    public function __construct() {
        add_action('rest_api_init', [ $this, 'generateRoutes']);
     }

    public function generateRoutes() {
        register_rest_route(self::NAMESPACE, self::ENDPOINT, [[
            'methods' => WP_REST_Server::CREATABLE, 
            'callback' => [$this, 'createForm'],
            'args' => MDFFormModel::getArgs(),
            'permission_callback' => $this->getPermission(),
            'schema' => MDFFormModel::getSchema(),
        ]]);

        register_rest_route(self::NAMESPACE, self::ENDPOINT, [[ 
            'methods' => WP_REST_Server::READABLE, 
            'callback' => [$this, 'list']],
            'permission_callback' => $this->getPermission(),
            'schema' => MDFFormModel::getSchema(),
         ]);
   
         register_rest_route(self::NAMESPACE, self::ENDPOINT . '/(?P<id>[\d]+)', [[ 
            'methods' => WP_REST_Server::READABLE, 
            'callback' => [$this, 'load']],
            'permission_callback' => $this->getPermission(),
            'schema' => MDFFormModel::getSchema(),
         ]);
   
         register_rest_route(self::NAMESPACE, self::ENDPOINT . '/(?P<id>[\d]+)', [[ 
            'methods' => WP_REST_Server::EDITABLE, 
            'callback' => [$this, 'update']],
            'args' => MDFFormModel::getArgs(),
            'permission_callback' => $this->getPermission(),
            'schema' => MDFFormModel::getSchema(),
         ]);
   
         register_rest_route(self::NAMESPACE, self::ENDPOINT . '/(?P<id>[\d]+)', [[ 
            'methods' => WP_REST_Server::DELETABLE, 
            'callback' => [$this, 'delete']],
            'permission_callback' => $this->getPermission(),
            'schema' => MDFFormModel::getSchema(),
         ]);

         register_rest_route(self::NAMESPACE, self::ENDPOINT . '/(?P<formid>[\d]+)/fields/(?P<id>[\d]+)', [[ 
            'methods' => WP_REST_Server::DELETABLE, 
            'callback' => [$this, 'deleteField']],
            'permission_callback' => $this->getPermission(),
            'schema' => MDFFieldModel::getSchema(),
         ]);
   
    }

    public function createForm($request = []) {
        $formModel = new MDFFormModel();
        $formModel->setParams($request->get_params());
        return  rest_ensure_response(['success' => $formModel->save()]);
    }


    public function update($request) {
        $requestParams = $request->get_params();
        $form = new MDFFormModel($requestParams['id']);
        $form->setParams($requestParams);
        return  rest_ensure_response(['success' => $form->update()]);
     }

     public function list($request) {
        $formModel = new MDFFormModel();
        $forms = $formModel->findAll([], [], true);
        return  rest_ensure_response($forms);
     }


     public function delete($request = []) {
        $requestParams = $request->get_params();
        $formModel = new MDFFormModel();
        $data = $formModel->find($requestParams['id']);
        return  rest_ensure_response([ 'success' => $formModel->delete() ]);  
     }

     public function deleteField($request) {
        $success = false;
        $fieldModel = new MDFFieldModel();
        $fields = $fieldModel->findAll(
            ['form_id' => '%d', 'id' => '%d'], 
            [$request->get_param('formid'), $request->get_param('id')]
        );
        
        if(count($fields) > 0) $success = (boolean)$fields[0]->delete();

        return  rest_ensure_response(['success' => $success]);
     }
  

    private function getPermission() {
        return '__return_true';
        return current_user_can( 'edit_posts' ) ? '__return_true' : '__return_false';
    }

    public function get_item_schema() {
        if($this->_schema) return $this->_schema;
        $this->_schema = MDFFormModel::getSchema();
        return $this->_schema;
    }
}