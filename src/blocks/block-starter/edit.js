/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { Button, Modal, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

const MyModal = () => {
	const [isOpen, setOpen] = useState(false);
	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	return (
		<>
			<Button variant="secondary" onClick={openModal}>
				Open Modal
			</Button>
			{isOpen && (
				<Modal title="This is my modal" onRequestClose={closeModal}>
					<Button variant="secondary" onClick={closeModal}>
						My custom close button
					</Button>
				</Modal>
			)}
		</>
	);
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<TextControl
				placeholder='font-size: 36px;'
				value={attributes.message}
				onChange={(val) => setAttributes({ message: val })}
			/>
			<MyModal />
		</div>
	);
}
