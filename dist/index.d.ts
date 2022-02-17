import React from 'react';

declare type FabDrawerProps = {
    menuItems?: string[] | JSX.Element[] | undefined;
    drawerStyles?: React.CSSProperties | undefined;
    fabStyles?: React.CSSProperties | undefined;
    listStyles?: React.CSSProperties | undefined;
    listItemStyles?: React.CSSProperties | undefined;
    hamburgerProps?: {
        size?: number;
        color?: string;
    } | undefined;
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
declare function FabDrawer(props: FabDrawerProps | undefined): JSX.Element;

export { FabDrawer };
