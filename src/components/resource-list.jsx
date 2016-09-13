import React, { Component, PropTypes } from "react";

import styles from "../styles/resource-list.css";
import RenderFriend from "./render-friend";
import GuestList from "./guest-list";

export default class ResourceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invitees: this.props.ourFriends.map(({name}) => {
        return {name: name, invited: false};
      }),
      invitee: {}
    };
    this.toggleGuest = this.toggleGuest.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
  }

  renderFriends(friends) {
    const invitees = this.state.invitees;
    const partyTime = invitees.length === invitees.filter(invitee => invitee.invited).length ? styles.party : '';
    return friends
      .filter((friend) => !!invitees.filter(invitee => invitee.name === friend.name && invitee.invited).length)
      .map((friend) => (<RenderFriend className={partyTime} key={friend.name} friend={friend}/>));
  }

  toggleGuest({name, invited}) {
    const invitees = this.state.invitees.map((invitee) => {
      if(invitee.name === name) {
        invitee.invited = !invited;
      }
      return invitee;
    });
    this.setState({invitees: invitees});
  }

  render() {
    let { ourFriends, message, outFocus } = this.props;
    const { invitees } = this.state;
    ourFriends = !!ourFriends ? ourFriends : exampleObj;
    const houseParty = invitees.length === invitees.filter(invitee => invitee.invited).length ? `${styles.houseParty} ${styles.house}` : styles.house;
    const containerStyle = outFocus ? `${styles.container} ${styles.outFocus}` : styles.container;

    return (
      <div>
        {!!message && <p>{message}</p>}
        <GuestList invitees={invitees} toggleGuest={invitee => this.toggleGuest(invitee)}/>
        <div className={containerStyle}>
          <div className={houseParty}>
            <div className={styles.room}>
              {this.renderFriends(ourFriends)}
            </div>
          </div>
        </div>
      </div>
    );
  }

};

ResourceList.displayName = "ResourceList";

ResourceList.PropTypes = {
  ourBestFriends: PropTypes.array,
  message: PropTypes.string
};

ResourceList.defaultProps = {};
