/**
 * BLOCK: Gutenberg Repeater Field
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import {
	Button,
	IconButton,
	PanelBody,
	TextControl,
} from '@wordpress/components';

export default function Edit( props ) {
	const handleAddLocation = () => {
		const locations = [ ...props.attributes.locations ];
		locations.push( {
			address: '',
		} );
		props.setAttributes( { locations } );
	};

	const handleRemoveLocation = ( index ) => {
		const locations = [ ...props.attributes.locations ];
		locations.splice( index, 1 );
		props.setAttributes( { locations } );
	};

	const handleLocationChange = ( address, index ) => {
		const locations = [ ...props.attributes.locations ];
		locations[ index ].address = address;
		props.setAttributes( { locations } );
	};

	let locationFields,
		locationDisplay;

	if ( props.attributes.locations.length ) {
		locationFields = props.attributes.locations.map( ( location, index ) => {
			return <Fragment key={ index }>
				<TextControl
					className="block-building-diagnostics__location-address"
					placeholder="350 Fifth Avenue New York NY"
					value={ props.attributes.locations[ index ].address }
					onChange={ ( address ) => handleLocationChange( address, index ) }
				/>
				<IconButton
					className="block-building-diagnostics__remove-location-address"
					icon="no-alt"
					label="Delete location"
					onClick={ () => handleRemoveLocation( index ) }
				/>
			</Fragment>;
		} );

		locationDisplay = props.attributes.locations.map( ( location, index ) => {
			return <p key={ index }>{ location.address }</p>;
		} );
	}

	return (
		<>
			<InspectorControls key="1">
				<PanelBody title={ __( 'Locations' ) }>
					{ locationFields }
					<Button
						isDefault
						onClick={ handleAddLocation.bind( this ) }
					>
						{ __( 'Add Location' ) }
					</Button>
				</PanelBody>
			</InspectorControls>,
			<div key="2" className={ props.className }>
				<h2>Block</h2>
				{ locationDisplay }
			</div>
		</>
	);
}
