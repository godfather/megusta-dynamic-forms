<?php
/**
 * Fired during plugin activation
 * 
 * This class generates all necessary tables to Dynamic Forms
 * 
 * @since  1.0.0
 * @package MegustaDynamicForms
 * @subpackage MegustaDynamicForms/data
 * @author Santiago Carmo <santiagocca@gmail.com>
 * 
 */

namespace MDF\Data;

require_once ABSPATH . 'wp-admin/install-helper.php';

class MDFDatabaseDefinition {
    public static function getTableName($name) {
        global $wpdb;
        return "{$wpdb->prefix}mdf_{$name}";
    }

    public static function defineFormsTable() {
        $tableName = self::getTableName('forms');

        return [
            'name' => $tableName,
            'sql' => "CREATE TABLE {$tableName} (
                id INT(11) unsigned NOT NULL AUTO_INCREMENT,
                form_name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT '0000-00-00 00:00:00',
                PRIMARY KEY (id)
            );"
        ];
    }

    public static function defineFieldsTable() {
        $tableName = self::getTableName('form_fields');

        return [
            'name' => $tableName,
            'sql' => "CREATE TABLE {$tableName} (
                id INT(11) unsigned NOT NULL AUTO_INCREMENT,
                form_id INT(11) NOT NULL,
                position INT(3) NOT NULL,
                field_type INT(2) NOT NULL,
                field_name VARCHAR(255) NOT NULL,
                field_label VARCHAR(255) NOT NULL,
                field_tip VARCHAR(255) NOT NULL,
                field_validations TEXT DEFAULT NULL,
                field_options TEXT DEFAULT NULL,
                field_css TEXT DEFAULT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT '0000-00-00 00:00:00',
                PRIMARY KEY (id)
            );"
        ];
    }

    public static function defineRegistrationsTable() {
        $tableName = self::getTableName('form_registrations');

        return [
            'name' => $tableName,
            'sql' => "CREATE TABLE {$tableName} (
                id INT(11) unsigned NOT NULL AUTO_INCREMENT,
                form_id INT(11) NOT NULL, 
                -- an user can submit the same form more than one time, 
                -- so we need this field to group the data submitted from an user
                -- in the same collection avoiding lost data or override another record
                uuid VARCHAR(130) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT '0000-00-00 00:00:00',
                PRIMARY KEY (id),
                UNIQUE KEY(uuid)
            );"
        ];
    }

    /**
     *  Using the EAV pattern to allow users create forms in a flexible way.
     */
    public static function defineRegistrationsValuesTable() {
        $tableName = self::getTableName('form_registration_values');

        return [
            'name' => $tableName,
            'sql' => "CREATE TABLE {$tableName} (
                id INT(11) unsigned NOT NULL AUTO_INCREMENT,
                registration_uuid VARCHAR(130) NOT NULL,
                field_id INT(11) NOT NULL,
                field_value TEXT DEFAULT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT '0000-00-00 00:00:00',
                PRIMARY KEY (id)
            );"
        ];
    }

    public static function run() {
        $dbDefinitions = [
            self::defineFormsTable(),
            self::defineFieldsTable(),
            self::defineRegistrationsTable(),
            self::defineRegistrationsValuesTable(),
        ];

        foreach($dbDefinitions as $k => $definition) {
            maybe_create_table($definition['name'], $definition['sql']);
        }
    }

    public static function update() {
       throw new Exception('Update not implemented yet!');
    }

 }
