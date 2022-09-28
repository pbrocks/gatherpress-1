<?php
/**
 * Template for displaying block content on frontend.
 */
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<h3><?php esc_html_e( 'Delivered via PHP', 'example-dynamic' ); ?></h3>
	<p><?php esc_html_e( 'Hello from a dynamic block!', 'example-dynamic' ); ?></p>
	<p><?php echo __FILE__; ?></p>
</div>
