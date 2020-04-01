import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GroupIcon from '@material-ui/icons/Group';

import './BottomBar.sass';


const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolBar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
  title: {
    flexGrow: 1,
    fontSize: 10,
    // display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const BottomBar = () => {
  const classes = useStyles();

  return (
    <Box display={{ xs: 'block', sm: 'none' }}>
      <AppBar position="fixed" color="primary" className={classes.appBar} style={{ backgroundColor: '#311b92' }}>
        <Toolbar className={classes.toolBar}>
          <NavLink to='/' style={{ textDecoration: 'none', color: 'white', width: 'min-content' }} activeStyle={{ color: '#84ffff' }} exact>
            <Box display='flex' flexWrap='wrap' css={{ maxWidth: 70, margin: 10 }}>
              <Box mx='auto' display='flex' justifyContent='center' css={{ width: '100%' }}>
                <DashboardIcon className={classes.icon} />            
              </Box>
              <Typography className={classes.title} variant='caption' noWrap>
                Dashboard
              </Typography>
            </Box>
          </NavLink>

          <NavLink to='/projects' style={{ textDecoration: 'none', color: 'white', width: 'min-content' }} activeStyle={{ color: '#84ffff' }} exact>
            <Box display='flex' flexWrap='wrap' css={{ maxWidth: 70, margin: 10 }}>
              <Box mx='auto' display='flex' justifyContent='center' css={{ width: '100%' }}>
                <LibraryBooksIcon className={classes.icon} />            
              </Box>
              <Typography className={classes.title} variant='caption' noWrap>
                Projects
              </Typography>
            </Box>
          </NavLink>

        <NavLink to='/productivity' style={{ textDecoration: 'none', color: 'white', width: 'min-content' }} activeStyle={{ color: '#84ffff' }} exact>
          <Box display='flex' flexWrap='wrap' css={{ maxWidth: 70, margin: 10 }}>
            <Box mx='auto' display='flex' justifyContent='center' css={{ width: '100%' }}>
              <AssessmentIcon className={classes.icon} />            
            </Box>
            <Typography className={classes.title} variant='caption' noWrap>
              Productivity
            </Typography>
          </Box>
        </NavLink>

      <NavLink to='/team' style={{ textDecoration: 'none', color: 'white', width: 'min-content' }} activeStyle={{ color: '#84ffff' }} exact>
        <Box display='flex' flexWrap='wrap' css={{ maxWidth: 70, margin: 10 }}>
          <Box mx='auto' display='flex' justifyContent='center' css={{ width: '100%' }}>
            <GroupIcon className={classes.icon} />            
          </Box>
          <Typography className={classes.title} variant='caption' noWrap>
            Team
          </Typography>
        </Box>
      </NavLink>

        </Toolbar>
      </AppBar>      
    </Box>
  );
}

export default BottomBar;