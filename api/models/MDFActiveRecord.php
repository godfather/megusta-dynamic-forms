<?php
/**
 * A mininal active record pattern
 *  
 * @since  1.0.0
 * @package MegustaDynamicForms
 * @subpackage MegustaDynamicForms/api/models
 * @author Santiago Carmo <santiagocca@gmail.com>
 * 
 */

 abstract class MDFActiveRecord {
    protected $data;

    public function __construct() {}

    public function toArray() {
        return $this->data;
    }


    public function __get($property) {
        if(method_exists($this, "get_{$property}")) {
            return call_user_func([$this, "get_{$property}"]);
        }

        return $this->data[$property];
    }

    public function __set($property, $value) {
        $this->setProperty($property, $value);
    }

    public function setParams($params = []) {
        if(isset($params['id'])) unset($params['id']); //avoid problems with mysql primary key;
        foreach($params as $property => $value) {
            $this->setProperty($property, $value);
        }
    }

    private function setProperty($property, $value) {
        if(method_exists($this, "set_{$property}")) {
            call_user_func([$this, "set_{$property}"], $value);
        } else {
            $this->data[$property] = $value;
        }
    }

    abstract public function save($dataToSave = null, $format);
 }