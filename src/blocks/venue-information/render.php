<?php
/**
 * Render Venue Information block.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

if ( ! isset( $attributes ) || ! is_array( $attributes ) ) {
	return;
}

if (
	empty( $attributes['name'] ) &&
	empty( $attributes['fullAddress'] ) &&
	empty( $attributes['phoneNumber'] ) &&
	empty( $attributes['website'] )
) {
	return;
}
// (WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase)
// phpcs:ignore
$gatherpress_full_address = $attributes['fullAddress'];

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<div class="gp-venue">
		<div>
		<?php if ( ! empty( $attributes['fullAddress'] ) || ! empty( $attributes['name'] ) ) : ?>
			<div class="gp-venue__row">
				<div class="gp-venue__item">
					<div class="gp-venue__icon">
						<div class="dashicons dashicons-location"></div>
					</div>
					<div class="gp-venue__text">
						<?php
						if ( ! empty( $attributes['name'] ) ) :
							?>
							<div class="gp-venue__name has-medium-font-size">
								<strong>
									<?php echo esc_html( $attributes['name'] ); ?>
								</strong>
							</div>
							<?php
						endif;
						if ( ! empty( $attributes['fullAddress'] ) ) :
							?>
							<div class="gp-venue__full-address">
								<?php echo esc_html( $attributes['fullAddress'] ); ?>
							</div>
							<?php
						endif;
						?>
					</div>
				</div>
			</div>
		<?php endif; ?>
			<div class="gp-venue__row gp-venue__gap">
			<?php if ( ! empty( $attributes['phoneNumber'] ) || ! empty( $attributes['website'] ) ) : ?>
				<?php if ( ! empty( $attributes['phoneNumber'] ) ) : ?>
					<div class="gp-venue__item">
						<div class="gp-venue__icon">
							<div class="dashicons dashicons-phone"></div>
						</div>
						<div class="gp-venue__text">
							<div class="gp-venue__phone-number">
								<?php echo esc_html( $attributes['phoneNumber'] ); ?>
							</div>
						</div>
					</div>
				<?php endif; ?>
				<?php if ( ! empty( $attributes['website'] ) ) : ?>
					<div class="gp-venue__item">
						<div class="gp-venue__icon">
							<div class="dashicons dashicons-admin-site-alt3"></div>
						</div>
						<div class="gp-venue__text">
							<div class="gp-venue__website">
								<a href="<?php echo esc_url( $attributes['website'] ); ?>" target="_blank" rel="noopener">
									<?php echo esc_html( $attributes['website'] ); ?>
								</a>
							</div>
						</div>
					</div>
				<?php endif; ?>
			<?php endif; ?>
			</div>
		</div>
	</div>
	<?php if ( $attributes['showVenueMap'] ) : ?>
		<div class="gp-venue__row gp-venue__gap">
			<div class="gp-venue__map" style="width:100%;height:<?php echo esc_attr( $attributes['deskHeight'] ); ?>px;">
				<iframe
					style="width:100%;height:<?php echo esc_attr( $attributes['deskHeight'] ); ?>px;"
					src="<?php echo esc_url( 'https://maps.google.com/maps?q=' ) . rawurlencode( $gatherpress_full_address ) . '&z=' . rawurlencode( $attributes['zoomVenueMap'] ) . '&t=' . rawurlencode( $attributes['typeVenueMap'] ) . '&output=embed'; ?>"
					title="<?php echo esc_html( $attributes['fullAddress'] ); ?>"
				></iframe>
			</div>
		</div>
	<?php endif; ?>
</div>
