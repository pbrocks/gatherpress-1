<?php
/**
 * The Singleton trait defines a method for ensuring a class has only one instance.
 *
 * This trait is responsible for implementing the Singleton design pattern in classes
 * that need to have a single instance throughout the application.
 *
 * @package GatherPress\Core
 * @since 1.0.0
 */

namespace GatherPress\Core\Traits;

/**
 * Singleton Trait.
 *
 * A reusable trait for implementing the singleton design pattern in PHP classes.
 *
 * @since 1.0.0
 */
trait Singleton {

	/**
	 * The single instance of the class.
	 *
	 * @since 1.0.0
	 * @var ?self|null The instance of the class.
	 */
	private static $instance = null;

	/**
	 * Get the instance of the Singleton class.
	 *
	 * If an instance does not exist, it creates one; otherwise, it returns the existing instance.
	 *
	 * @since 1.0.0
	 *
	 * @return self The instance of the class.
	 */
	public static function get_instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

}
