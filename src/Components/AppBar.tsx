import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloudIcon from "@mui/icons-material/Cloud";
import "../Style/AppBar.css";
import { Link } from "react-router-dom";
import Toggle from "./Toggle"
import HomeIcon from "@mui/icons-material/Home"
import FavoriteIcon from "@mui/icons-material/Favorite";


export default function ButtonAppBar() {
  function onChange(event:any) {
    const {checked} = event.target;
    if(checked) {
      document.querySelector('html')?.classList.add('dark')
    }else{
      document.querySelector('html')?.classList.remove('dark')
    }
  }
  return (
    <Box sx={{  }}>
      <AppBar position='static' className='app-bar'>
        <Toolbar className='app-bar-inner'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 1 }}
          >
            <CloudIcon />
          </IconButton>
          <Typography className='hide-mobile' variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Weather Task
          </Typography>
          <Button
            style={{ margin: "0.7rem" }}
            variant='contained'
            className='btn'>
            <Link  className="appBarIcon" to='/'><HomeIcon/><span className='hide-mobile' >Home</span></Link>
          </Button>
          <Button variant='contained' className='btn'>
            <Link className="appBarIcon" to='/favorites'><FavoriteIcon/><span className='hide-mobile' >Favorites</span></Link>
          </Button>
          <Toggle data={{title: 'Light/Dark', func: onChange}}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
