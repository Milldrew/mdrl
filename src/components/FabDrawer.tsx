import React from "react";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
/**
 * @props: menuItems = navigational links
 * @props: drawerStyles = custom style object
 * @props: fabStyles = custom style object
 * @remarks: pass the same type of object you would pass to a style prop to fabStyles and drawerStyles.
 * Pass an array of jsx elements to the menuItems prop, the link needs to be a part of the jsx element
 */
export function FabDrawer(props) {
  const [menuItems, setMenuItems] = useState(
    props.menuItems || ["Home", "Projects", "Contact"]
  );
  const [isOpen, setOpen] = useState(false);
  const [drawerState, setDrawerState] = useState({
    reset: false,
    reverse: false,
    pause: true,
  });
  const styles = useSpring({
    reset: drawerState.reset,
    reverse: drawerState.reverse,
    pause: drawerState.pause,
    from: { x: "0%" },
    to: { x: "80%" },
  });
  useEffect(() => {
    /*menuItems changes from stings to elements*/
    setMenuItems(
      menuItems.map((item) => {
        return <ListItem>{item}</ListItem>;
      })
    );
  }, ["menuItems"]);
  function handleClick() {
    if (drawerState.pause) {
      setDrawerState({
        pause: false,
        reset: drawerState.reset,
        reverse: drawerState.reverse,
      });
    } else {
      setDrawerState({
        pause: drawerState.pause ? false : false,
        reset: !drawerState.reset,
        reverse: !drawerState.reverse,
      });
    }
    setOpen(!isOpen);
    console.log("hello");
  }

  return (
    <React.Fragment>
      <animated.div
        style={Object.assign(
          {
            top: 0,
            left: "-80%",
            width: "70vw",
            height: "100vh",
            backgroundColor: "#dedede",
            borderRadius: 16,
            position: "fixed",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            ...styles,
          },
          props.drawerStyles
        )}
      >
        <ul style={{ listStyleType: "none", marginLeft: 25 }}>{menuItems}</ul>
      </animated.div>
      <div
        onClick={() => handleClick()}
        style={Object.assign(
          {
            padding: 10,
            backgroundColor: "#dedede",
            position: "fixed",
            right: "3%",
            bottom: "3%",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          props.fabStyles
        )}
      >
        <Hamburger size={100} toggled={isOpen} toggle={handleClick} />
      </div>
    </React.Fragment>
  );
}

function ListItem(props) {
  let style = {
    marginTop: 20,
    fontSize: 30,
    color: "#030303",
    fontWeight: "bold",
  };

  return <li style={style}>{props.children} </li>;
}
