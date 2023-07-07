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

namespace MDF;

use MDF\Data\MDFDatabaseDefinition;
use MDF\Libs\MDFApi;

require_once 'vendor/autoload.php';
require_once ABSPATH . 'wp-admin/install-helper.php';


class MegustaDynamicForms {
    const MDF_PLUGIN_VERSION = '1.0.0';
    const DB_OPTION_PLUGIN_VERSION = 'megusta-dynamic-forms-plugin-version';

    public static function init() {
        $api = new MDFApi();
        register_activation_hook(MDF_PLUGIN_FILE , [static::class, 'onActiveHandler']);
        add_action('admin_menu', [static::class, 'enqueueScripts']);
        add_action('admin_menu', [static::class, 'createAdminMenus']);
    }

    public static function onActiveHandler() {
        MDFDatabaseDefinition::run();
    }

    public static function createAdminMenus() {
        add_menu_page(__('Megusta Dynamic Forms'), __('Megusta Dynamic Forms'),'manage_options', "mdf", [static::class, 'megustaRootHtml'], 'dashicons-text', 30);
        // add_submenu_page('mdf-list',__('Megusta Dynamic Forms'), __('All entries'), 'manage_options', 'mdf-list', ['MegustaDynamicForms', 'megustaRootHtml']);
        // add_submenu_page('mdf-list',__('Add new entry'), __('Add new entry'), 'manage_options', 'mdf-create', ['MegustaDynamicForms', 'megustaRootHtml']);
    }

    public static function megustaRootHtml() {
        echo '<section id="mdf-root"></div>';
    }

    public static function enqueueScripts() {
        if(in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
            $jsLoadScript = 'http://localhost:3000/static/js/bundle.js';
            $cssLoadStyles = 'http://localhost:3000/static/css/bundle.css';
        } else {
            $jsLoadScript = plugin_dir_url( __FILE__ ) . 'ghost-inspector.js'; //update this path
            $cssLoadStyles = plugin_dir_url( __FILE__ ) . 'ghost-inspector.css'; //update this path
        }

        wp_enqueue_style('megusta_dynamic_forms_css', $cssLoadStyles);
        wp_enqueue_script('megusta_dynamic_forms_js', $jsLoadScript, '', mt_rand(10,1000), true);
        wp_enqueue_script('megusta_dynamic_forms_js_icons', 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js', '', mt_rand(10,1000), true);
    }


    // public static function init() {
    //     require dirname(MDF_PLUGIN_FILE) . '/api/MDFAdminController.php';

    //     $formController = new MDFAdminController();

    //     register_activation_hook(MDF_PLUGIN_FILE, ['MegustaDynamicForms', 'activateMegustaDynamicForms']);
    //     register_deactivation_hook(MDF_PLUGIN_FILE, ['MegustaDynamicForms', 'deactivateMegustaDynamicForms']);
    //     add_action('admin_menu', ['MegustaDynamicForms', 'createAdminMenus']);
    // }
    
    // public static function activateMegustaDynamicForms() {
    //     require_once dirname(MDF_PLUGIN_FILE) . '/data/MDFCreateDatabaseStructure.php';
    //     if(class_exists('MDFCreateDatabaseStructure')) {
    //         MDFCreateDatabaseStructure::generateDatabaseTables();
    //     }
    // }

    // public static function deactivateMegustaDynamicForms() {

    // }
}
