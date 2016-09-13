import React, { Component, PropTypes } from "react";

import styles from "../styles/resource-list.css";

export default class GuestList extends Component {

  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }

  renderInvitees(inviteesArr) {
    return inviteesArr.map((invitee) => (
      <div key={invitee.name} className={styles.guestName}>
        <input
          id={invitee.name}
          type="checkbox"
          checked={invitee.invited}
          onChange={() => this.props.toggleGuest(invitee)}/>
        <label htmlFor={invitee.name}>
          {invitee.name}
        </label>
      </div>
    ));
  }

  handleCheck(e) {
    e.preventDefault();
    this.props.toggleGuest(e.target.id, e.target.checked);
  }

  render() {
    const { invitees } = this.props;

    return (
      <div className={styles.guestList}>
        <h1>Guest List:</h1>
        {this.renderInvitees(invitees)}
      </div>
    );
  }

}

GuestList.propTypes = {
  friends: PropTypes.array,
  toggleGuest: PropTypes.func
};
