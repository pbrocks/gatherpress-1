<?php
/**
 * Plugin Name:         GatherPress
 * Plugin URI:          https://gatherpress.org/
 * Description:         GatherPress adds event management and more to WordPress.
 * Author:              The GatherPress Community
 * Author URI:          https://gatherpess.org/
 * Version:             0.4
 * Minimum PHP Version: 7.3
 * Text Domain:         gatherpress
 * License:             GPLv2 or later (license.txt)
 *
 * @package GatherPress
 */

// Constants.
define( 'GATHERPRESS_VERSION', current( get_file_data( __FILE__, array( 'Version' ), 'plugin' ) ) );
define( 'GATHERPRESS_MINIMUM_PHP_VERSION', current( get_file_data( __FILE__, array( 'Minimum PHP Version' ), 'plugin' ) ) );
define( 'GATHERPRESS_CORE_PATH', __DIR__ );
define( 'GATHERPRESS_CORE_URL', plugin_dir_url( __FILE__ ) );
define( 'GATHERPRESS_REST_NAMESPACE', 'gatherpress/v1' );

/**
 * Check version of PHP before loading plugin.
 */
if ( version_compare( PHP_VERSION_ID, GATHERPRESS_MINIMUM_PHP_VERSION, '<' ) ) {
	add_action(
		'admin_notices',
		function() {
			?>
			<div class="notice notice-error">
				<p>
					<?php
					echo sprintf(
						/* translators: %1$s: minimum PHP version, %2$s current PHP version. */
						esc_html__(
							'GatherPress requires PHP Version %1$s or greater. You are currently running PHP %2$s. Please upgrade.',
							'gatherpress'
						),
						esc_html( GATHERPRESS_MINIMUM_PHP_VERSION ),
						esc_html( PHP_VERSION_ID )
					);
					?>
				</p>
			</div>
			<?php
		}
	);

	return;
}

require_once GATHERPRESS_CORE_PATH . '/core/loader.php';
require_once GATHERPRESS_CORE_PATH . '/buddypress/loader.php';

add_action( 'init', 'combined_blocks_block_init' );
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function combined_blocks_block_init() {
	register_block_type( __DIR__ . '/build/blocks/date-gp' );
	// register_block_type( __DIR__ . '/build/blocks/block-starter' );
}
