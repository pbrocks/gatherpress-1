import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';

// registerBlockType( 'gatherpress/attendance-selector', {
import metadata from './block.json';

registerBlockType( metadata, {
	edit,
	save: () => null,
} );
