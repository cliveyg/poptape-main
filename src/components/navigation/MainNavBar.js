import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
//import MenuIcon from '@material-ui/icons/Menu'
import BlurOn from '@material-ui/icons/BlurOn'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Launch from '@material-ui/icons/Launch'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import FaceIcon from '@material-ui/icons/Face'
import Input from '@material-ui/icons/Input'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'

import { Link } from "react-router-dom"

import LoginDialog from '../modals/Login'
import SignupDialog from '../modals/Signup'
import Cookies from 'js-cookie'
import '../../Poptape.css'

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "none",
    alignSelf: "center",
    color: "white",
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  customBadgeGreen: {
    backgroundColor: "#66bb6a",
    //"#ffab00", // yellowy
    color: "black"
  },
  customBadgeRed: {
    backgroundColor: "#c2185b",
    color: "white"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonDark: {
    marginRight: theme.spacing(2),
    backgroundColor: "#1769aa"
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  linky: {
    color: "white",
    "&:visited": {
      color: "white",
    },
    textDecoration: "none",
  },
  mlinky: { 
    color: "inherit",
    "&:visited": {
      color: "inherit",
    },
    textDecoration: "none",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function MainNavBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [loggedIn, setLoggedIn] = React.useState(Cookies.get('access-token') ? true : false);
    const [username, setUsername] = React.useState(Cookies.get('username'));
    const [showLoginPopup, setLoginPopup] = React.useState(false)
    const [showSignupPopup, setSignupPopup] = React.useState(false)
    const [userLink, setUserLink] = React.useState('/user/')

    function handleProfileMenuOpen(event) {
        if (loggedIn) {
            setUserLink('/user/'+Cookies.get('username'))
        }        
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        if (loggedIn) {
            setUserLink('/user/'+Cookies.get('username'))
        }
        setMobileMoreAnchorEl(event.currentTarget);
    }

    function toggleLoggedIn() {
        setUsername(Cookies.get('username'))
        setLoggedIn(Cookies.get('access-token') ? true : false)
        if (loggedIn) {
            setUserLink('/user/'+Cookies.get('username'))
        }
    }

    function togglePopup(box) {
        if (box === "login") {
            setLoginPopup(!showLoginPopup)
            setSignupPopup(false)
        } else if (box === "signup") {
            setSignupPopup(!showSignupPopup)
            setLoginPopup(false)
        }
    }

  const menuId = 'primary-search-account-menu';
  //const userLink = '/user/'+username
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link className={classes.mlinky} to={userLink}>Profile</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link className={classes.mlinky} to={userLink+'/account'}>My account</Link></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!loggedIn ?
      <MenuItem onClick={() => togglePopup("signup")}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Launch />
        </IconButton>
        <p>Signup</p>
      </MenuItem>
      : 
      <span>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge
            badgeContent={4}
            classes={{ badge: classes.customBadgeGreen }}
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge
            badgeContent={24}
            classes={{ badge: classes.customBadgeRed }}
          >  
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <Link className={classes.mlinky} to={userLink}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <FaceIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      </Link>
      <Link className={classes.mlinky} to={userLink+'/account'}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
      </Link>
      <MenuItem onClick={() => togglePopup("login")}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PowerSettingsNew />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
      </span>
      }
      {!loggedIn ?
          <MenuItem onClick={() => togglePopup("login")}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <Input />
            </IconButton>
            <p>Login</p>
          </MenuItem>
        : null
        }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButtonDark}
            color="inherit"
            aria-label="open drawer"
          >
            <BlurOn />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className={classes.linky} to='/'>Poptape Auctions</Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {!loggedIn?
            <Button
                onClick={() => togglePopup("signup")}
                classes={{ root: classes.button }}>
                 Signup
            </Button>
          :
            <span>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge
                badgeContent={4}
                classes={{ badge: classes.customBadgeGreen }}
              >
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge
                badgeContent={24}
                classes={{ badge: classes.customBadgeRed }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Typography
                variant="inherit"
                color="inherit"
                style={{ paddingLeft: '0.7em' }}
            >
                {username}
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </span>
          }
            <Button
                onClick={() => togglePopup("login")}
                classes={{ root: classes.button }}>
                {loggedIn ?
                 'Logout'
                :
                 'Login'
                }
            </Button>
            {showLoginPopup ?
                <LoginDialog
                    closePopup={() => togglePopup("login")}
                    loggedIn={toggleLoggedIn.bind()}
                />
            : null
            }
            {showSignupPopup ?
                <SignupDialog
                    closePopup={() => togglePopup("signup")}
                    loggedIn={toggleLoggedIn.bind()}
                />
            : null
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

