/**
 * WordPress dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import edit from './edit';

import metadata from './block.json';

import '../../panels';

import '../../settings';

import './style.scss';

registerBlockType( metadata, {
	edit,
	save: () => null,
} );
