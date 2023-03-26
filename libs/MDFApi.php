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

 class MDFApi extends WP_REST_Controller {
    const API_NAMESPACE = 'mdf';
    const API_VERSION = 'v1';
    const NAMESPACE = self::API_NAMESPACE . '/' . self::API_VERSION;

    private $_schema;

    public function __construct() {
        add_action('rest_api_init', [ $this, 'generateRoutes']);
     }

    public function generateRoutes() {
        register_rest_route(self::NAMESPACE, 'forms', [
            [
                'methods' => WP_REST_Server::CREATABLE, 
                'callback' => [$this, 'createForm'],
                'args' => MDFFormModel::getArgs(),
                'permission_callback' => '__return_true', //???
            ],
            'schema' => MDFFormModel::getSchema(),
        ]);
    }

    public function createForm($request = []) {
        return [ 'success' => true ];
    }


    public function get_item_schema() {
        if($this->_schema) return $this->_schema;
        $this->_schema = MDFFormModel::getSchema();
        return $this->_schema;
    }
}