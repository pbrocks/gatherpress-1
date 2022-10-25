<?php
/**
 * Container for Add to calendar block.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

use GatherPress\Core\Event;

$gatherpress_event = new Event( get_the_ID() );
if ( ! is_admin() ) {
?>
<script>
/**
 * Toggle to Show/Hide Calendar options.
 *
 * @param {TouchEvent} e Event.
 */
const addToCalendarToggle = ( e ) => {
	e.preventDefault();

	const currentListDisplay = e.target.nextElementSibling.style.display;
	const lists = document.querySelectorAll( '.gp-add-to-calendar__list' );

	for ( let i = 0; i < lists.length; i++ ) {
		lists[ i ].style.display = 'none';
	}

	e.target.nextElementSibling.style.display = ( 'none' === currentListDisplay ) ? 'flex' : 'none';
};

/**
 * Initialize all Add To Calendar blocks.
 */
const addToCalendarInit = () => {
	const containers = document.querySelectorAll( '.gp-add-to-calendar' );

	for ( let i = 0; i < containers.length; i++ ) {
		containers[ i ].querySelector( '.gp-add-to-calendar__init' ).addEventListener( 'click', addToCalendarToggle, false );

		document.addEventListener( 'click', ( { target } ) => {
			if ( ! target.closest( '.gp-add-to-calendar' ) ) {
				containers[ i ].querySelector( '.gp-add-to-calendar__list' ).style.display = 'none';
			}
		} );
	}
};

addToCalendarInit();
</script>
<?php
}
?>
<div class="gp-add-to-calendar">
	<div class="gp-add-to-calendar__row">
		<div class="gp-add-to-calendar__item">
			<div class="gp-add-to-calendar__icon">
				<div class="dashicons dashicons-calendar"></div>
			</div>
			<div class="gp-add-to-calendar__text">
				<a class="gp-add-to-calendar__init" href="#">
					<?php esc_html_e( 'Add to calendar', 'gatherpress' ); ?>
				</a>
				<div class="gp-add-to-calendar__list" style="display: none;">
					<?php foreach ( $gatherpress_event->get_calendar_links() as $gatherpress_calendar ) : ?>
						<div class="gp-add-to-calendar__list-item">
							<?php if ( ! empty( $gatherpress_calendar['link'] ) ) : ?>
							<a href="<?php echo esc_url( $gatherpress_calendar['link'] ); ?>" target="_blank" rel="noopener noreferrer">
								<?php elseif ( ! empty( $gatherpress_calendar['download'] ) ) : ?>
								<a href="<?php echo esc_attr( $gatherpress_calendar['download'] ); ?>" rel="noopener noreferrer">
									<?php endif; ?>
									<?php echo esc_html( $gatherpress_calendar['name'] ); ?>
								</a>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
</div>
