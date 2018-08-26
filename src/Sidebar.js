import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem
      button
      component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItem>
    <ListItem
      button
      component={Link} to="/employees">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
    <ListItem
      button
      component={Link} to="/managers">
      <ListItemIcon>
        <PeopleIcon style={{ color: "red" }} />
      </ListItemIcon>
      <ListItemText primary="Managers" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Reports</ListSubheader>
    <ListItem
      button
      component={Link} to="/employee/1">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
  </div>
);
