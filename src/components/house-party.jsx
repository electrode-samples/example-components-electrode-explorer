import React, { Component, PropTypes } from "react";

import styles from "../../src/styles/house-party.css";
import RenderFriend from "./render-friend";
import GuestList from "./guest-list";

export default class HouseParty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invitees: this.props.ourFriends.map(({name}) => {
        return { name, invited: false};
      })
    };
  }

  renderFriends(friends) {
    const invitees = this.state.invitees;
    const partyTime = invitees.length === invitees.filter((i) => i.invited).length
    ? styles.party
    : "";

    return friends
      .filter((friend) => {
        return !!invitees.filter((invitee) => {
          return invitee.name === friend.name && invitee.invited;
        }).length;
      })
      .map((friend) => (
        <RenderFriend className={partyTime} key={friend.name} friend={friend}/>
      ));
  }

  toggleGuest({name, invited}) {
    const invitees = this.state.invitees.map((invitee) => {
      if (invitee.name === name) {
        invitee.invited = !invited;
      }
      return invitee;
    });
    this.setState({invitees});
  }

  viewState({ view }) {
    if (view) {
      return view;
    }
    return {
      intro: true,
      invite: true
    };
  }

  houseParty(invitees) {
    return invitees.length === invitees.filter((invitee) => {
      return invitee.invited;
    }).length && invitees.length !== 0
    ? `${styles.houseParty} ${styles.house}`
    : styles.house;
  }

  render() {
    const { ourFriends, message } = this.props;
    const { invitees } = this.state;
    const { invite, intro } = this.viewState(this.props);
    const houseParty = this.houseParty(invitees);

    return (
      <div>
        {invite && !!invitees.length &&
          <GuestList invitees={invitees} toggleGuest={(invitee) => this.toggleGuest(invitee)}/>}
        <div className={styles.container}>
        {intro && !invitees.filter((invitee) => invitee.invited).length &&
          <p className={styles.message}>{message}</p>}
          <div className={houseParty}>
            <div className={styles.room}>
              {this.renderFriends(ourFriends)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HouseParty.displayName = "HouseParty";

HouseParty.PropTypes = {
  ourFriends: PropTypes.array,
  message: PropTypes.string
};

HouseParty.defaultProps = {
  ourFriends: [],
  message: `Let's party! Un-comment the all the commented-out lines in the
  playground then check the boxes on the GuestList to invite our friends to the party!`
};
