<?php

/**
 * Plugin Name:       Megusta Dynamic Forms
 * Plugin URI:        https://megusta.co
 * Description:       A toolkit to help you create any kind of form on your website. The best part, it's completely free ;)
 * Version:           1.0.0
 * Author:            Santiago Carmo <santiago@megusta.co>
 * Author URI:        https://megusta.co
 * License:           GPLv2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       megusta-dynamic-forms
 * Domain Path:       /languages
 * 
 * @package MegustaDynamicForms
 */


defined( 'ABSPATH' ) || exit;

//Defines a constant with the plugin main file path
//It's necessary to avoid bugs on some WP hooks
if (!defined( 'WC_PLUGIN_FILE')) define( 'MDF_PLUGIN_FILE', __FILE__ );

require_once dirname(__FILE__) . '/config/megusta-dynamic-forms-constants.php';
require_once dirname(__FILE__) . '/MegustaDynamicForms.php';
MegustaDynamicForms::init();
