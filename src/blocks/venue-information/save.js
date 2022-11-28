/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const blockProps = useBlockProps.save();
	return (
		<div {...blockProps}>
			{props.attributes.fullAddress && (
				<p>{props.attributes.fullAddress}</p>
			)}
			{props.attributes.phoneNumber && (
				<p>{props.attributes.phoneNumber}</p>
			)}
			{props.attributes.website && <p>{props.attributes.website}</p>}
			<p>
				{__(
					"Venue Information – hello from the saved content!",
					"gatherpress"
				)}
			</p>
		</div>
	);
}