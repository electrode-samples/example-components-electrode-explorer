import React from "react";

import styles from "../../src/styles/guest-list.css";

const GuestList = ({invitees, toggleGuest}) => {

  const renderInvitees = (inviteesArr) => {
    return inviteesArr.map((invitee) => (
      <div key={invitee.name} className={styles.guestName}>
        <input
          id={invitee.name}
          type="checkbox"
          checked={invitee.invited}
          onChange={() => toggleGuest(invitee)}/>
        <label htmlFor={invitee.name}>
          {invitee.name}
        </label>
      </div>
    ));
  };

  return (
    <div className={styles.guestList}>
      <h1>Guest List:</h1>
      {renderInvitees(invitees)}
    </div>
  );

};

GuestList.propTypes = {
  invitees: React.PropTypes.array,
  toggleGuest: React.PropTypes.func
};

export default GuestList;
