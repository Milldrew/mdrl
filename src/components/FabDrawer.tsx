import React from "react";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
type FabDrawerProps = {
  menuItems?: string[] | JSX.Element[] | undefined;
  drawerStyles?: React.CSSProperties | undefined;
  fabStyles?: React.CSSProperties | undefined;
  listStyles?: React.CSSProperties | undefined;
  listItemStyles?: React.CSSProperties | undefined;
  hamburgerProps?: { size?: number; color?: string } | undefined;
};
/**
 * @props: menuItems = navigational links
 * @props: drawerStyles = custom style object
 * @props: fabStyles = custom style object
 * @props: listStyles = custom style object # ul element
 * @props: listItemStyles = custom style object # li element
 * @props: hamburgerProps = size(12-48) color(bar color)
 * @remarks: pass the same type of object you would pass to a style prop to fabStyles and drawerStyles.
 * Pass an array of jsx elements to the menuItems prop, the link needs to be a part of the jsx element
 */
export function FabDrawer(props: FabDrawerProps | undefined) {
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
    to: { x: "100vw" },
  });
  const drawerStyle = Object.assign(
    {
      position: "fixed",
      top: 0,
      left: "-100vw",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#dedede",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      ...styles,
    },
    props.drawerStyles
  );
  useEffect(() => {
    /*menuItems changes from stings to elements*/
    setMenuItems(
      menuItems.map((item, index) => {
        return <ListItem key={index}>{item}</ListItem>;
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
      <animated.div style={drawerStyle}>
        <ul
          onClick={handleClick}
          style={Object.assign(
            {
              paddingRight: "10%",
              textAlign: "center",
              listStyleType: "none",
              display: "table",
              margin: "100 auto",
              marginTop: 20,
            },
            props.listStyles
          )}
        >
          {menuItems}
        </ul>
      </animated.div>
      <div
        onClick={() => handleClick()}
        style={Object.assign(
          {
            position: "fixed",
            padding: 10,
            backgroundColor: "#dedede",
            right: "3%",
            bottom: "3%",
            borderRadius: 20,
            border: ".5px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          props.fabStyles
        )}
      >
        <Hamburger
          {...props.hamburgerProps}
          toggled={isOpen}
          toggle={handleClick}
        />
      </div>
    </React.Fragment>
  );
}

function ListItem(props: {
  children: string | JSX.Element;
  key: number;
  listItemStyles: React.CSSProperties | undefined;
}) {
  let style = {
    lineHeight: 2,
    fontSize: 24,
    color: "#030303",
    fontWeight: 500,
    letterSpacing: 3,
  };

  return (
    <li style={Object.assign(style, props.listItemStyles)} key={props.key}>
      {props.children}
    </li>
  );
}
