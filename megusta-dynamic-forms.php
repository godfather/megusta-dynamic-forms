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

require_once dirname(__FILE__) . '/config/megusta-dynamic-forms-constants.php';

if(!class_exists( 'MegustaDynamicForms')) {
	require_once dirname(__FILE__) . '/MegustaDynamicForms.php';
	add_action( 'plugins_loaded', array( 'MegustaDynamicForms', 'init' ));
}
