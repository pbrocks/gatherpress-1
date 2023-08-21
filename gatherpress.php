<?php
/**
 * Plugin Name:         GatherPress
 * Plugin URI:          https://gatherpress.org/
 * Description:         Powering Communities with WordPress.
 * Author:              The GatherPress Community
 * Author URI:          https://gatherpess.org/
 * Version:             0.20.0
 * Minimum PHP Version: 7.4
 * Text Domain:         gatherpress
 * License:             GPLv2 or later (license.txt)
 *
 * @package GatherPress
 */

// Constants.
define( 'GATHERPRESS_VERSION', current( get_file_data( __FILE__, array( 'Version' ), 'plugin' ) ) );
define( 'GATHERPRESS_MINIMUM_PHP_VERSION', current( get_file_data( __FILE__, array( 'Minimum PHP Version' ), 'plugin' ) ) );
define( 'GATHERPRESS_CORE_PATH', __DIR__ );
define( 'GATHERPRESS_CORE_FILE', __FILE__ );
define( 'GATHERPRESS_CORE_URL', plugin_dir_url( __FILE__ ) );
define( 'GATHERPRESS_REST_NAMESPACE', 'gatherpress/v1' );

// Bail if things do not meet minimum plugin requirements.
if ( ! require_once GATHERPRESS_CORE_PATH . '/includes/core/preflight.php' ) {
	return;
}

require_once GATHERPRESS_CORE_PATH . '/includes/core/classes/class-autoloader.php';

GatherPress\Core\Autoloader::register();
GatherPress\Core\Setup::get_instance();
GatherPress\BuddyPress\Setup::get_instance();

add_filter('define_leadership_array_options', 'individualized_options', 10, 2 );
/**
 * Mike hates this: put in the class?
 *
 * @param array $options
 * @return array
 */
function individualized_options($options) {
	$options = [
		'event-assistants'     => array(
			'labels' => array(
				'name'          => __( 'Event Assistants', 'gatherpress' ),
				'singular_name' => __( 'Event Assistant', 'gatherpress' ),
				'plural_name'   => __( 'Event Assistants', 'gatherpress' ),
			),
			'field'  => array(
				'type'    => 'autocomplete',
				'options' => array(
					'type'  => 'user',
					'label' =>  __( 'Select Users', 'gatherpress' ),
				),
			),
		),
	];
	return $options;
}
