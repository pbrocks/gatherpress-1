import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';

// registerBlockType( 'gatherpress/attendance-selector', {
import metadata from './block.json';

registerBlockType( metadata, {
	apiVersion: 2,
	title: __( 'Attendance Selector', 'gatherpress' ),
	icon: 'groups',
	category: 'gatherpress',
	attributes: {
		content: { type: 'string' },
		color: { type: 'string' },
	},
	edit,
	save: () => null,
} );
