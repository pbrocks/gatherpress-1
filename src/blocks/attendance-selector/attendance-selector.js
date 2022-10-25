/**
 * External dependencies.
 */
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Internal dependencies.
 */
import AttendanceSelector from '../../components/AttendanceSelector';

const containers = document.querySelectorAll(
	`[data-gp_block_name="attendance-selector"]`,
);
// eslint-disable-next-line no-undef
const type = '1' === GatherPress.has_event_past ? 'past' : 'upcoming';

for ( let i = 0; i < containers.length; i++ ) {
	ReactDOM.render(
		<AttendanceSelector
			// eslint-disable-next-line no-undef
			eventId={ GatherPress.post_id }
			// eslint-disable-next-line no-undef
			currentUser={ GatherPress.current_user }
			type={ type }
		/>,
		containers[ i ],
	);
}
