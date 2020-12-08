<?php
/**
 * Future events block.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

$gatherpress_max_posts = intval( $attrs['maxNumberOfEvents'] );
$gatherpress_max_posts = ( 0 > $gatherpress_max_posts ) ? 5 : $gatherpress_max_posts;

$gatherpress_query = \GatherPress\Inc\Query::get_instance()->get_future_events( $gatherpress_max_posts );
?>
<div id="gp-upcoming-events-container">
	<?php
	if ( $gatherpress_query->have_posts() ) {
		?>
		<?php
		while ( $gatherpress_query->have_posts() ) {
			$gatherpress_query->the_post();

			$gatherpress_event = new \GatherPress\Inc\Event( get_the_ID() );
			?>
			<div class="bg-white">
				<div class="flex p-4">
					<?php
					if ( has_post_thumbnail() ) {
						?>
						<div class="flex-shrink-0 w-1/3 self-start mr-4">
							<?php the_post_thumbnail( 'medium' ); ?>
						</div>
						<?php
					}
					?>
					<div class="flex-grow w-2/3">
						<h5>
							<?php echo esc_html( $gatherpress_event->get_datetime_start() ); ?>
						</h5>
						<h3>
							<a href="<?php the_permalink(); ?>" class="block">
								<?php the_title(); ?>
							</a>
						</h3>
						<p>
							<?php the_excerpt(); ?>
						</p>
					</div>
				</div>
			</div>
			<?php
		}
		wp_reset_postdata();
	}
	?>
</div>