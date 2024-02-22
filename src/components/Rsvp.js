/**
 * External dependencies
 */
import Modal from 'react-modal';
import HtmlReactParser from 'html-react-parser';
import { Tooltip } from 'react-tooltip';

/**
 * WordPress dependencies.
 */
import { useState } from '@wordpress/element';
import { __, _n, _x, sprintf } from '@wordpress/i18n';
import { ButtonGroup, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies.
 */
import { Broadcaster } from '../helpers/broadcasting';
import RsvpStatusResponse from './RsvpStatusResponse';
import { getFromGlobal } from '../helpers/globals';

/**
 * Rsvp component for GatherPress.
 *
 * This component provides functionality for users to RSVP to events. It includes a button
 * to open a modal for RSVP actions, handles different RSVP statuses, and updates the RSVP
 * status and guest count accordingly. If the enableAnonymousRsvp prop is true, it shows
 * a checkbox to permit anonymous RSVPs. The component communicates with the server through
 * REST API calls and broadcasts changes to other components.
 *
 * @since 1.0.0
 *
 * @param {Object}  props                     - Component props.
 * @param {number}  props.postId              - The ID of the event.
 * @param {Object}  [props.currentUser='']    - Current user's RSVP information.
 * @param {boolean} props.enableAnonymousRsvp - If true, shows a checkbox to allow anonymous RSVPs.
 * @param {string}  props.type                - Type of event ('upcoming' or 'past').
 *
 * @return {JSX.Element} The rendered React component.
 */
const Rsvp = ({ postId, currentUser = '', type, enableAnonymousRsvp }) => {
	const [rsvpStatus, setRsvpStatus] = useState(currentUser.status);
	const [rsvpAnonymous, setRsvpAnonymous] = useState(
		Number(currentUser.anonymous)
	);
	const [rsvpGuests, setRsvpGuests] = useState(currentUser.guests);
	const [selectorHidden, setSelectorHidden] = useState('hidden');
	const [selectorExpanded, setSelectorExpanded] = useState('false');
	const [modalIsOpen, setIsOpen] = useState(false);

	const customStyles = {
		overlay: {
			zIndex: 999999999,
		},
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	const openModal = (e) => {
		e.preventDefault();
		setIsOpen(true);
	};

	// No need to show block if event is in the past.
	if ('past' === type) {
		return '';
	}

	// Might be better way to do this, but should only run on frontend, not admin.
	if ('undefined' === typeof adminpage) {
		Modal.setAppElement('.gp-enabled');
	}

	const closeModal = (e) => {
		e.preventDefault();

		setIsOpen(false);
	};

	const onAnchorClick = async (
		e,
		status,
		anonymous,
		guests = 0,
		close = true
	) => {
		e.preventDefault();

		if ('attending' !== status) {
			guests = 0;
		}

		apiFetch({
			path: getFromGlobal('urls.eventRestApi') + '/rsvp',
			method: 'POST',
			data: {
				post_id: postId,
				status,
				guests,
				anonymous,
				_wpnonce: getFromGlobal('misc.nonce'),
			},
		}).then((res) => {
			if (res.success) {
				setRsvpStatus(res.status);
				setRsvpGuests(res.guests);

				const count = {
					all: 0,
					attending: 0,
					not_attending: 0, // eslint-disable-line camelcase
					waiting_list: 0, // eslint-disable-line camelcase
				};

				for (const [key, value] of Object.entries(res.responses)) {
					count[key] = value.count;
				}

				const payload = {
					setRsvpStatus: res.status,
					setRsvpResponse: res.responses,
					setRsvpCount: count,
					setRsvpSeeAllLink: count[res.status] > 8, // @todo make defaultLimit a setting, not hardcoded.
					setOnlineEventLink: res.online_link,
				};

				Broadcaster(payload, res.event_id);

				if (close) {
					closeModal(e);
				}
			}
		});
	};

	const getButtonText = (status) => {
		switch (status) {
			case 'attending':
			case 'waiting_list':
			case 'not_attending':
				return __('Edit RSVP', 'gatherpress');
		}

		return __('RSVP', 'gatherpress');
	};

	const getModalLabel = (status) => {
		switch (status) {
			case 'attending':
				return __("You're attending", 'gatherpress');
			case 'waiting_list':
				return __("You're wait listed", 'gatherpress');
			case 'not_attending':
				return __("You're not attending", 'gatherpress');
		}

		return __('RSVP to this event', 'gatherpress');
	};

	const onSpanKeyDown = (e) => {
		if (13 === e.keyCode) {
			setSelectorHidden('hidden' === selectorHidden ? 'show' : 'hidden');
			setSelectorExpanded(
				'false' === selectorExpanded ? 'true' : 'false'
			);
		}
	};

	const LoggedOutModal = () => {
		return (
			<div className="gp-modal gp-modal__rsvp">
				<div className="gp-modal__header">
					{__('Login Required', 'gatherpress')}
				</div>
				<div className="gp-modal__content">
					<div className="gp-modal__text">
						{__('You must ', 'gatherpress')}
						<a href={getFromGlobal('urls.loginUrl')}>
							{__('Login', 'gatherpress')}
						</a>
						{__(' to RSVP to events.', 'gatherpress')}
					</div>
					{'' !== getFromGlobal('urls.registrationUrl') && (
						<div className="gp-modal__text">
							<a href={getFromGlobal('urls.registrationUrl')}>
								{__('Register', 'gatherpress')}
							</a>
							{__(
								' if you do not have an account.',
								'gatherpress'
							)}
						</div>
					)}
				</div>
				<ButtonGroup className="gp-buttons wp-block-buttons">
					<div className="gp-buttons__container wp-block-button">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a
							href="#"
							onClick={closeModal}
							className="gp-buttons__button wp-block-button__link"
						>
							{__('Close', 'gatherpress')}
						</a>
					</div>
				</ButtonGroup>
			</div>
		);
	};

	const LoggedInModal = ({ status }) => {
		let buttonStatus = '';
		let buttonLabel = '';

		if ('not_attending' === status || 'no_status' === status) {
			buttonStatus = 'attending';
			buttonLabel = __('Attend', 'gatherpress');
		} else {
			buttonStatus = 'not_attending';
			buttonLabel = _x(
				'Not Attending',
				'action of not attending',
				'gatherpress'
			);
		}

		return (
			<div className="gp-modal gp-modal__rsvp">
				<div className="gp-modal__header">
					{getModalLabel(rsvpStatus) ? (
						getModalLabel(rsvpStatus)
					) : (
						<Spinner />
					)}
				</div>
				<div className="gp-modal__content">
					<div className="gp-modal__text">
						{HtmlReactParser(
							sprintf(
								/* translators: %s: button label. */
								__(
									'To set or change your attending status, simply click the %s button below.',
									'gatherpress'
								),
								'<strong>' + buttonLabel + '</strong>'
							)
						)}
					</div>
					{enableAnonymousRsvp ? (
						<div className="gp-modal__anonymous">
							<input
								id="gp-anonymous"
								type="checkbox"
								onChange={(e) => {
									const value = Number(e.target.checked);
									setRsvpAnonymous(value);
									onAnchorClick(
										e,
										rsvpStatus,
										value,
										rsvpGuests,
										false
									);
								}}
								checked={rsvpAnonymous}
							/>
							<label
								htmlFor="gp-anonymous"
								tabIndex="0"
								className="gp-tooltip"
								data-tooltip-id="gp-anonymous-tooltip"
								data-tooltip-content={__(
									'Only admins will see your identity.',
									'gatherpress'
								)}
							>
								{__('List me as anonymous.', 'gatherpress')}
							</label>
							<Tooltip id="gp-anonymous-tooltip" />
						</div>
					) : (
						<></>
					)}
					{/*@todo Guests feature coming in later version of GatherPress*/}
					{/*	<label htmlFor="gp-guests">*/}
					{/*		{__('Number of guests?', 'gatherpress')}*/}
					{/*	</label>*/}
					{/*	<input*/}
					{/*		id="gp-guests"*/}
					{/*		type="number"*/}
					{/*		min="0"*/}
					{/*		max="5"*/}
					{/*		onChange={(e) =>*/}
					{/*			onAnchorClick(*/}
					{/*				e,*/}
					{/*				'attending',*/}
					{/*				e.target.value,*/}
					{/*				false*/}
					{/*			)*/}
					{/*		}*/}
					{/*		defaultValue={rsvpGuests}*/}
					{/*	/>*/}
				</div>
				<ButtonGroup className="gp-buttons wp-block-buttons">
					<div className="gp-buttons__container wp-block-button is-style-outline">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a
							href="#"
							onClick={(e) =>
								onAnchorClick(e, buttonStatus, rsvpAnonymous)
							}
							className="gp-buttons__button wp-block-button__link"
						>
							{buttonLabel}
						</a>
					</div>
					<div className="gp-buttons__container wp-block-button">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a
							href="#"
							onClick={closeModal}
							className="gp-buttons__button wp-block-button__link"
						>
							{__('Close', 'gatherpress')}
						</a>
					</div>
				</ButtonGroup>
			</div>
		);
	};

	return (
		<div className="gp-rsvp">
			<ButtonGroup className="gp-buttons wp-block-buttons">
				<div className="gp-buttons__container  wp-block-button">
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a
						href="#"
						className="gp-buttons__button wp-block-button__link"
						aria-expanded={selectorExpanded}
						tabIndex="0"
						onKeyDown={onSpanKeyDown}
						onClick={(e) => openModal(e)}
					>
						{getButtonText(rsvpStatus)}
					</a>
				</div>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel={__('Edit RSVP', 'gatherpress')}
				>
					{0 === currentUser.length && <LoggedOutModal />}
					{0 !== currentUser.length && (
						<LoggedInModal status={rsvpStatus} />
					)}
				</Modal>
			</ButtonGroup>
			{'no_status' !== rsvpStatus && (
				<div className="gp-status">
					<RsvpStatusResponse type={type} status={rsvpStatus} />

					{0 < rsvpGuests && (
						<div className="gp-status__guests">
							<span>
								+{' '}
								{sprintf(
									/* translators: %d: Number of guests. */
									_n(
										'%d guest',
										'%d guests',
										{ rsvpGuests },
										'gatherpress'
									),
									{ rsvpGuests }
								)}
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Rsvp;
