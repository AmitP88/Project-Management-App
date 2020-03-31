import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import './NavBar.sass';


const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
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

const NavBar = () => {
  const classes = useStyles();

  return (
    <Box display={{ xs: 'block', sm: 'none' }}>
      <AppBar position="fixed" color="primary" className={classes.appBar} style={{ backgroundColor: '#311b92' }}>
        <Toolbar>
          <Box display='flex' flexWrap='wrap' css={{ maxWidth: 70, margin: 10 }}>
            <Box mx='auto' css={{ width: 45 }}>
              <DashboardIcon className={classes.icon} />            
            </Box>
            <Typography className={classes.title} variant='caption' noWrap>
              Dashboard
            </Typography>          
          </Box>

          <Box display='flex' flexWrap='wrap' css={{ maxWidth: 70, margin: 10 }}>
            <Box mx='auto' css={{ width: 55 }}>
              <LibraryBooksIcon className={classes.icon} />            
            </Box>
            <Typography className={classes.title} variant='caption' noWrap>
              Projects
            </Typography>          
          </Box>


        </Toolbar>
      </AppBar>      
    </Box>
  );
}

export default NavBar;