/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import edit from './edit';

import metadata from './block.json';

import './style.scss';

import './add-to-calendar';

registerBlockType( metadata, {
	edit,
	save: () => null,
} );
