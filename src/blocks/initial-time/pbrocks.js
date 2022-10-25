/**
 * Internal dependencies
 */

// import './panels';

import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

export const PBrocksDocumentSettingPanel = () => (
	<PluginDocumentSettingPanel
		name="pbrocks-panel"
		title="PBrocks Panel"
		className="pbrocks-panel"
	>
		PBrocks Panel Contents
	</PluginDocumentSettingPanel>
);

registerPlugin('pbrocks-document-setting-panel-example', {
	render: PBrocksDocumentSettingPanel,
	icon: 'palmtree',
});

