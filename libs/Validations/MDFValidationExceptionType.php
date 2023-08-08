<?php

/**
 * Defines a type structure to be used inside ValidationException class
 *  
 * @since  1.0.0
 * @package MegustaDynamicForms
 * @subpackage MegustaDynamicForms/libs
 * @author Santiago Carmo <santiagocca@gmail.com>
 * 
 */

namespace MDF\Libs\Validations;

class MDFValidationExceptionType {
    private  $_message;
    private  $_code;
    private  $_field;


    /**
     * Json encodes the message and calls the parent constructor.
     *
     * @param string         $message
     * @param int            $code
     * @param string         $field
     */
    public function __construct($message = null, $field = null, $code = 400) {
        $this->_message = $message;
        $this->_field = $field;
        $this->_code = $code;
    }
    
    /**
     * Returns the json encoded message.
     *
     * @return mixed
     */
     public function getEncodedMessage() {
        return json_encode([
            'message' => $this->_message,
            'field' => $this->_field,
            'code' => $this->_code,
        ]);
     }
}