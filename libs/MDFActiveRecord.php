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

namespace MDF\Libs;

use \Exception;

abstract class MDFActiveRecord {
    protected $wpdb;
    protected $tableName;
    protected $data = [];
    protected $isNewRecord;
    protected static $modelName;

    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        self::$modelName = get_called_class();
        $this->setAsNewRecord();
    }

    public function toArray() {
        return $this->data;
    }

    public function __get($property) {
        if(method_exists($this, "get_{$property}")) {
            return call_user_func([$this, "get_{$property}"]);
        }

        if(isset($this->data[$property])) return $this->data[$property];
        return null;
    }

    public function __set($property, $value) {
        $this->setProperty($property, $value);
    }

    public function setAsNewRecord($isNew = true) {
        $this->isNewrecord = $isNew;
    }

    public function isNewRecord($isNew = true) {
        return $this->isNewrecord;
    }

    public function setParams($params = [], $unsetId = true) {
        if($unsetId && isset($params['id'])) unset($params['id']); //avoid problems with mysql primary key;
        
        foreach($params as $property => $value) {
            $this->setProperty($property, $value);
        }
    }

    public function find($id) {        
        if(!is_numeric($id)) throw new Exception("Invalid argument!");
        
        $query = $this->wpdb->prepare("SELECT * FROM {$this->tableName} WHERE id=%d LIMIT 1", $id);
        $result = $this->wpdb->get_results($query, ARRAY_A);

        if($result) {
            $this->setAsNewRecord(false);
            $this->setParams($result[0], false);
            return $this;
        }

        return false;
    }

    public function findAll($options = [], $values = [], $asArray = false) {
        $query = "SELECT * FROM {$this->tableName}";        
        if(!empty($options)) $query .= self::prepareOptions($options);

        $query  = $this->wpdb->prepare($query, $values);
        $results = $this->wpdb->get_results($query, ARRAY_A);

        if($asArray) return $results;
        
        $resultsAsObject = [];
        foreach($results as $k => $result) {
            $resultsAsObject[] = $this->convertToInstance($result);
        }

        return $resultsAsObject;
    }

    public function findAllByQuery($query, $asArray = false) {
        if(empty($query)) throw new Exception("Invalid argument!");

        $query = "SELECT * FROM {$this->tableName} WHERE $query";
        $results = $this->wpdb->get_results($query, ARRAY_A);

        if($asArray) return $results;

        $resultsAsObject = [];
        foreach($results as $k => $result) {
            $resultsAsObject[] = $this->convertToInstance($result);
        }

        return $resultsAsObject;
    }

    public function delete($id = null) {
        if(!is_numeric($id)) throw new Exception("Invalid argument!");
        $id = isset($id) ? $id : $this->id;
        return $this->wpdb->delete($this->tableName, ['id' => $id], ['%d']);
    }

    public function deleteCollection($options = [], $format = []) {
        return $this->wpdb->delete($this->tableName, $options, $format);
    }

    public function count($options = [], $values = []) {
        $query = "SELECT COUNT(*) FROM {$this->tableName}";        
        if(!empty($options)) {
            $query .= self::prepareOptions($options);
            return $this->wpdb->get_var($query, $values);
        }
        
        return $this->wpdb->get_var($query);
    }

    abstract public function save($format = []);
    abstract public function update($format = []);
    abstract public static function getSchema() : array;
    abstract public static function getArgs() : array;

    private function setProperty($property, $value) {
        if(method_exists($this, "set_{$property}")) {
            call_user_func([$this, "set_{$property}"], $value);
        } else {
            $this->data[$property] = $value;
        }
    }

    private static function prepareOptions($options = []) {
        $query = [];
        
        foreach($options as $k => $value) {
            $query[] = "{$k}={$value}";
        }

        return " WHERE " . implode(' AND ', $query);
    }

    private function convertToInstance($params) {
        $model = new self::$modelName();
        $model->setAsNewRecord(false);
        $model->setParams($params, false);
        return $model;
    }
 }