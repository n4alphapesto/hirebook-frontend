import React from 'react';
import { Box, Grid, Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
    },
    title: {
        fontweight: 400, 
    }, 
    listOfItems: {
        display: 'flex',
        flexDirection: 'column', 
    }
  }));


  function Footer() {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();

    return (
      <div className={classes.root}>
        <Box>

        
        <Grid container spacing={3}>
         
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" className={classes.title}>Jobs By Location</Typography>
            <div className={classes.listOfItems}>
                {
                    ['bangalore', 'gurgaon', 'hyderabad', 'mumbai'].map((location, i) => (
                            <Link 
                                key={i} 
                                href="#" 
                                onClick={preventDefault}
                            >
                                {`Jobs in ${location[0].toUpperCase() + location.slice(1, location.length)}`}
                            </Link>
                        ))
                }

            </div>
            
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" className={classes.title}>Jobs By Function</Typography>
            <div className={classes.listOfItems}>
                {
                    ['Frontend', 'Backend', 'FullStack', 'Cloud'].map((role, i) => (
                            <Link 
                                key={i} 
                                href="#" 
                                onClick={preventDefault}
                            >
                                {`${role} developer jobs`}
                            </Link>
                        ))
                }

                </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" className={classes.title}>For Recruiters</Typography>
            <div className={classes.listOfItems}>
                {
                    ['Post your jobs', 'Success Stories'].map((item, i) => (
                            <Link 
                                key={i} 
                                href="#" 
                                onClick={preventDefault}
                            >
                                {`${item}`}
                            </Link>
                        ))
                }

                </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" className={classes.title}>hirebook</Typography>
            <div className={classes.listOfItems}>
                {
                    ['blog', 'about', 'privacy', 'terms'].map((page, i) => (
                            <Link 
                                key={i} 
                                href="#" 
                                onClick={preventDefault}
                            >
                                {`${page[0].toUpperCase() + page.slice(1, page.length)}`}
                            </Link>
                        ))
                }

                </div>
          </Grid>
        </Grid>
        </Box>
      </div>
    );
  }

export default Footer;