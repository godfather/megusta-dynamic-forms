<?php
/**
 * MegustaDynamicForms
 * 
 * @since  1.0.0
 * @package MegustaDynamicForms
 * @subpackage MegustaDynamicForms
 * @author Santiago Carmo <santiagocca@gmail.com>
 * 
 */

defined('ABSPATH') || exit;

class MegustaDynamicForms {
    public static function init() {
        require dirname(MDF_PLUGIN_FILE) . '/api/MDFAdminController.php';

        $formController = new MDFAdminController();

        register_activation_hook(MDF_PLUGIN_FILE, ['MegustaDynamicForms', 'activateMegustaDynamicForms']);
        register_deactivation_hook(MDF_PLUGIN_FILE, ['MegustaDynamicForms', 'deactivateMegustaDynamicForms']);
        add_action('admin_menu', ['MegustaDynamicForms', 'createAdminMenus']);
    }
    
    public static function activateMegustaDynamicForms() {
        require_once dirname(MDF_PLUGIN_FILE) . '/data/MDFCreateDatabaseStructure.php';
        if(class_exists('MDFCreateDatabaseStructure')) {
            MDFCreateDatabaseStructure::generateDatabaseTables();
        }
    }

    public static function deactivateMegustaDynamicForms() {

    }

    public static function createAdminMenus() {
        add_menu_page(__('Megusta Dynamic Forms'), __('Megusta Dynamic Forms'),'manage_options', "mdf-list", ['MegustaDynamicForms', 'megustaRootHtml'], 'dashicons-text', 30);
        add_submenu_page('mdf-list',__('Megusta Dynamic Forms'), __('All entries'), 'manage_options', 'mdf-list', ['MegustaDynamicForms', 'megustaRootHtml']);
        add_submenu_page('mdf-list',__('Add new entry'), __('Add new entry'), 'manage_options', 'mdf-create', ['MegustaDynamicForms', 'megustaRootHtml']);
    }

    public static function megustaRootHtml() {
        require_once dirname(__FILE__) . '/data/MDFCreateDatabaseStructure.php';
        echo '<pre>'. MEGUSTA_DYNAMIC_FORMS_TABLE;
    }
}
