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


 // If this file is called directly, abort.
 defined('ABSPATH') || die;

 class MDFCreateDatabaseStructure {
    
    /**
     * Get the current plugin's version stored on database
     *
     * @return void
     */
    public static function getVersion() {
        return get_option(MEGUSTA_DYNAMIC_FORMS_VERSION_KEY);
    }


    public static function updateVersion() {
        update_option(MEGUSTA_DYNAMIC_FORMS_VERSION_KEY, MEGUSTA_DYNAMIC_FORMS_VERSION);
    }

    public static function getDbSchema() {
        global $wpdb;

        $collate = $wpdb->has_cap( 'collation' ) ? $wpdb->get_charset_collate() : '';

        return "CREATE TABLE {$wpdb->prefix}megusta_dynamic_forms (
                    id INT(11) unsigned NOT NULL AUTO_INCREMENT,
                    form_name VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (id)
                ) $collate;
                CREATE TABLE {$wpdb->prefix}megusta_dynamic_forms_fields (
                    id INT(11) unsigned NOT NULL AUTO_INCREMENT,
                    form_id INT(11) NOT NULL,
                    position INT(3) NOT NULL,
                    field_type INT(2) NOT NULL,
                    field_name VARCHAR(255) NOT NULL,
                    field_label VARCHAR(255) NOT NULL,
                    field_tip VARCHAR(255) NOT NULL,
                    field_validations TEXT DEFAULT NULL,
                    field_options TEXT DEFAULT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (id)
                ) $collate;
                CREATE TABLE {$wpdb->prefix}megusta_dynamic_forms_registrations (
                    id INT(11) unsigned NOT NULL AUTO_INCREMENT,
                    form_id INT(11) NOT NULL, 
                    -- an user can submit the same form more than one time, 
                    -- so we need this field to group the data submitted from an user
                    -- in the same collection avoiding lost data or override another record
                    uuid VARCHAR(130) NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (id),
                    UNIQUE KEY(registration_uuid)
                ) $collate;
                CREATE TABLE {$wpdb->prefix}megusta_dynamic_forms_values (
                    id INT(11) unsigned NOT NULL AUTO_INCREMENT,
                    registration_uuid VARCHAR(130) NOT NULL,
                    field_id INT(11) NOT NULL,
                    field_value TEXT DEFAULT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (id)
                ) $collate;";
    }

    public static function generateDatabaseTables() {
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        return dbDelta(self::getDbSchema(), true);
    }
 }
 