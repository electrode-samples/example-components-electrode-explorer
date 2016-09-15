import React from "react";

import styles from "../../src/styles/render-friend.css";
import style from "../helpers/graph-styles";

const DEFAULT_SIZE = 15;
const DEGREES_OF_COOL = 360;

const RenderFriend = ({friend, styleObj, className}) => {

  const { name, img, profile, friends } = friend;
  let { size } = friend;
  const parentFriend = { name, img, profile };
  size = size ? size : DEFAULT_SIZE;

  const bgImg = {backgroundImage: `url(${img})`};
  let applyStyle = styleObj
    ? Object.assign(bgImg, styleObj)
    : Object.assign(bgImg, style("single", size));

  applyStyle = friends ? style("container", size) : applyStyle;
  let applyClass = friends ? styles.join : styles.friend;
  applyClass = styleObj ? applyClass : `${applyClass} ${styles.join} ${className || ""}`;

  const renderFriends = (friendsArr) => {
    const angleVal = (DEGREES_OF_COOL / friendsArr.length);
    let rotateVal = 0;

    return friendsArr.map((friendObj) => {
      rotateVal += angleVal;
      return (
        <RenderFriend
          key={friendObj.name}
          friend={friendObj}
          styleObj={style("child", size, rotateVal)}/>
        );
    });
  };

  return (
    <div className={applyClass} style={applyStyle}>
      {!!friends && renderFriends(friends)}
      {!!friends && <RenderFriend friend={parentFriend} styleObj={style("parent", size)}/>}
    </div>
  );
};

RenderFriend.propTypes = {
  friend: React.PropTypes.object,
  styleObj: React.PropTypes.object
};

export default RenderFriend;
