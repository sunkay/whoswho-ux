import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from "react-router-dom";

export const mainListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={
        ({ children, ...props }) =>
        <Link to="/employees" {...props}>
          {children}
        </Link>
        }>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employees">
        </ListItemText>
      </ListItem>
      <ListItem button component={
        ({ children, ...props }) =>
        <Link to="/managers" {...props}>
          {children}
        </Link>
        }>
        <ListItemIcon>
          <PeopleIcon style={{color: 'red'}}/>
        </ListItemIcon>
        <ListItemText primary="Managers" />
      </ListItem>
    </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
  </div>
);