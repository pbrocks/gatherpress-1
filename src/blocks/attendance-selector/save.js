/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

const AttendanceModal = () => {
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
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {
	const blockProps = useBlockProps.save();
	return (
		<div {...blockProps}>
			<p>
				{__(
					"AttendanceSelector – hello from the saved content!",
					"gatherpress"
				)}
			</p>
		</div>
	);
}
