<?php
/**
 * Plugin       New GP Blocks
 * Description:       A Gutenberg block to show your pride! This block enables you to type text and style it with the color font Gilbert from Type with Pride.
 * Version:           0.1.0
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       new-gp-blocks
 *
 * @package          new_gp_blocks
 */

add_action( 'init', 'create_new_gp_blocks' );
add_action( 'block_categories_all', 'block_category_setup' );
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_new_gp_blocks() {
	register_block_type( __DIR__ . '/build/blocks/gutenpride' );

	register_block_type(
		__DIR__ . '/build/blocks/dynamic',
		array(
			'render_callback' => 'dynamic_php_render_callback',
		)
	);
}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function dynamic_php_render_callback( $attributes, $content, $block ) {
	ob_start();
	require plugin_dir_path( __FILE__ ) . 'src/blocks/dynamic/template.php';
	echo '<pre>' . print_r( $block, true ) . '</pre>';
	return ob_get_clean();
}

/**
 * Add New GP block category.
 *
 * @param array $block_categories All the registered block categories.
 *
 * @return array
 */
function block_category_setup( $block_categories ) {
	$new_gp = array(
		'slug'  => 'new-gp',
		'title' => __( 'New GP', 'new-gp' ),
	);
	array_unshift(
		$block_categories,
		$new_gp
	);
	return $block_categories; 
}
