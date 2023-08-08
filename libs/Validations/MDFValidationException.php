<?php

/**
 * Extension of Exception class to return a structured array 
 * with validation error details
 *  
 * @since  1.0.0
 * @package MegustaDynamicForms
 * @subpackage MegustaDynamicForms/libs
 * @author Santiago Carmo <santiagocca@gmail.com>
 * 
 */

namespace MDF\Libs\Validations;

use \Exception;
use MDF\Libs\Validations\MDFValidationExceptionType;

class MDFValidationException extends Exception {
    /**
     * Json encodes the message and calls the parent constructor.
     *
     * @param MDFValidationExceptionType|null     $message
     * @param int                                 $code
     * @param Exception|null                      $previous
     */

    public function __construct(
        MDFValidationExceptionType $message = null, 
        int $code = 0, 
        Exception $previous = null) {
        parent::__construct($message->getEncodedMessage(), $code, $previous);
    }
    
    /**
     * Returns the json decoded message.
     *
     * @return mixed
     */
    
     public function getDecodedMessage() {
        return json_decode($this->getMessage());
     }
}