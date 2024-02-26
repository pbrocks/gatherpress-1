<?php
/**
 * Class responsible for managing Topic instances.
 *
 * This class facilitates the management of the Topic taxonomy within the context of the Event post type.
 *
 * @package GatherPress\Core
 * @since 1.0.0
 */

namespace GatherPress\Core;

use GatherPress\Core\Traits\Singleton;

/**
 * Class Topic.
 *
 * Manages Topic taxonomy for the GatherPress Event post type, including registration and administration.
 *
 * @since 1.0.0
 */
class Topic {
	/**
	 * Enforces a single instance of this class.
	 */
	use Singleton;

	/**
	 * The taxonomy name for GatherPress event topics.
	 *
	 * @since 1.0.0
	 * @var string $TAXONOMY
	 */
	const TAXONOMY = 'gp_topic';

	/**
	 * Class constructor.
	 *
	 * This method initializes the object and sets up necessary hooks.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->setup_hooks();
	}

	/**
	 * Set up hooks for various purposes.
	 *
	 * This method adds hooks for different purposes as needed.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	protected function setup_hooks(): void {
		add_action( 'init', array( $this, 'register_taxonomy' ) );
	}

	/**
	 * Registers the Topic taxonomy for the Event post type.
	 *
	 * Sets up the Topic taxonomy with labels and settings for admin visibility, REST API support,
	 * and hierarchical structuring. This method ensures Topics are properly integrated within
	 * WordPress for management and querying.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_taxonomy(): void {
		register_taxonomy(
			self::TAXONOMY,
			Event::POST_TYPE,
			array(
				'labels'            => array(
					'name'              => _x( 'Topics', 'taxonomy general name', 'gatherpress' ),
					'singular_name'     => _x( 'Topic', 'taxonomy singular name', 'gatherpress' ),
					'search_items'      => __( 'Search Topics', 'gatherpress' ),
					'all_items'         => __( 'All Topics', 'gatherpress' ),
					'view_item'         => __( 'View Topic', 'gatherpress' ),
					'parent_item'       => __( 'Parent Topic', 'gatherpress' ),
					'parent_item_colon' => __( 'Parent Topic:', 'gatherpress' ),
					'edit_item'         => __( 'Edit Topic', 'gatherpress' ),
					'update_item'       => __( 'Update Topic', 'gatherpress' ),
					'add_new_item'      => __( 'Add New Topic', 'gatherpress' ),
					'new_item_name'     => __( 'New Topic Name', 'gatherpress' ),
					'not_found'         => __( 'No Topics Found', 'gatherpress' ),
					'back_to_items'     => __( 'Back to Topics', 'gatherpress' ),
					'menu_name'         => __( 'Topics', 'gatherpress' ),
				),
				'hierarchical'      => true,
				'public'            => true,
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => array(
					'slug' => _x( 'topic', 'Taxonomy Slug', 'gatherpress' ),
				),
				'show_in_rest'      => true,
			)
		);
	}
}
