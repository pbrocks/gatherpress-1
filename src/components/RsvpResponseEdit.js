/**
 * WordPress dependencies.
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { FormTokenField } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies.
 */
import { getFromGlobal, setToGlobal } from '../helpers/globals';

/**
 * Component for displaying and managing RSVP responses.
 *
 * This component renders a user interface for managing RSVP responses to an event.
 * It includes options for attending, being on the waiting list, or not attending,
 * and updates the status based on user interactions. The component also listens for
 * changes in RSVP status and updates the state accordingly.
 *
 * @since 1.0.0
 *
 * @return {JSX.Element} The rendered RSVP response component.
 */
const RsvpResponseEdit = () => {
	const responses = getFromGlobal('eventDetails.responses');
	const postId = getFromGlobal('eventDetails.postId');
	const [rsvpResponse, setRsvpResponse] = useState(responses);
	const attendees = rsvpResponse.attending.responses;

	/**
	 * Fetches user records from the core store via getEntityRecords.
	 * Returns userList containing the list of user records.
	 */
	const { userList } = useSelect((select) => {
		const { getEntityRecords } = select(coreStore);

		const users = getEntityRecords('root', 'user', {
			per_page: -1,
		});

		return {
			userList: users,
		};
	}, []);

	/**
	 * Reduces the userList to an object mapping usernames to user objects.
	 * This provides convenient lookup from username to full user data.
	 */
	const userSuggestions =
		userList?.reduce(
			(accumulator, user) => ({
				...accumulator,
				[user.username]: user,
			}),
			{}
		) ?? {};

	/**
	 * Updates the RSVP status for a user attending the given event.
	 *
	 * @param {number} userId               - The ID of the user to update.
	 * @param {string} [status='attending'] - The RSVP status to set (attending or remove).
	 */
	const updateUserStatus = (userId, status = 'attending') => {
		apiFetch({
			path: getFromGlobal('urls.eventRestApi') + '/rsvp',
			method: 'POST',
			data: {
				post_id: postId,
				status,
				user_id: userId,
				_wpnonce: getFromGlobal('misc.nonce'),
			},
		}).then((res) => {
			setRsvpResponse(res.responses);
			setToGlobal('eventDetails.responses', res.responses);
		});
	};

	/**
	 * Updates the attendee list for the RSVP based on the provided tokens.
	 * If new tokens are added, new attendees will be added.
	 * If existing tokens are removed, the associated attendees will be removed.
	 *
	 * @param {Object[]} tokens - Array of token objects representing attendees
	 */
	const changeAttendees = async (tokens) => {
		// Adding some new attendees
		if (tokens.length > attendees.length) {
			tokens.forEach((token) => {
				if (!userSuggestions[token]) {
					return;
				}

				// We have a new user to add to the attendees list.
				updateUserStatus(userSuggestions[token].id, 'attending');
			});
		} else {
			// Removing attendees
			attendees.forEach((attendee) => {
				if (false === tokens.some((item) => item.id === attendee.id)) {
					updateUserStatus(attendee.id, 'no_status');
				}
			});
		}
	};

	return (
		<div className="gp-rsvp-response">
			<FormTokenField
				key="query-controls-topics-select"
				label={__('Attendees', 'gatherpress')}
				value={
					attendees &&
					attendees.map((item) => ({
						id: item.id,
						value: item.name,
					}))
				}
				tokenizeOnSpace={true}
				onChange={changeAttendees}
				suggestions={Object.keys(userSuggestions)}
				maxSuggestions={20}
			/>
		</div>
	);
};

export default RsvpResponseEdit;
