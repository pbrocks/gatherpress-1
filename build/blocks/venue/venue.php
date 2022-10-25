<?php
/**
 * Template for Venue block.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

use GatherPress\Core\Utility;
use GatherPress\Core\Venue;

if ( ! isset( $gatherpress_block_attrs ) || ! is_array( $gatherpress_block_attrs ) ) {
	return;
}

$gatherpress_venue = get_post( intval( $gatherpress_block_attrs['venueId'] ) );

if ( Venue::POST_TYPE !== get_post_type( $gatherpress_venue ) ) {
	return;
}

$gatherpress_venue_information = json_decode( get_post_meta( $gatherpress_venue->ID, '_venue_information', true ) );
?>
<div class="gp-venue">
	<?php
	Utility::render_template(
		sprintf( '%s/templates/blocks/venue-information.php', GATHERPRESS_CORE_PATH ),
		array(
			'gatherpress_block_attrs' => array(
				'name'        => $gatherpress_venue->post_title,
				'fullAddress' => $gatherpress_venue_information->fullAddress ?? '', // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				'phoneNumber' => $gatherpress_venue_information->phoneNumber ?? '', // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				'website'     => $gatherpress_venue_information->website ?? '',
			),
		),
		true
	);
	?>
</div>
