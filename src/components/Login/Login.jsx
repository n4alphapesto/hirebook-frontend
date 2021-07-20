import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSnackbar } from "notistack";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { login } from "../../redux/actions/auth";

const Login = ({ loginAction, isLogging, closeDialog, user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");

  const redirectUser = (data) => {
    let url;
    console.log(data);
    if (data.userType === "JOBSEEKER") {
      url = "/jobseeker";

      if (!data.isOnboardingCompleted) {
        url += "/onboarding";
      }
    } else {
      url = "/recruiter";

      if (!data.isOnboardingCompleted) {
        url += "/onboarding";
      }
    }

    window.location.href = url;
  };

  const login = (e) => {
    e.preventDefault();

    loginAction({ email, password })
      .then((result) => {
        enqueueSnackbar("Login Successfully.", { variant: "success" });

        const data = result?.data?.data;
        redirectUser(data);
      })
      .catch((error) => {
        console.log(" --- error --- ", error);
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  return (
    <Box p={2} pb={4}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12} md={10}>
          <form onSubmit={login}>
            <Grid item xs={12}>
              <Box mt={5}>
                <Typography variant="subtitle2" className={classes.label}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  id="email_address"
                  placeholder="Enter Email Address"
                  size="small"
                  type="email"
                  variant="outlined"
                  onChange={({ target }) => _setEmail(target.value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box mt={2}>
                <Typography variant="subtitle2" className={classes.label}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  required
                  id="password"
                  placeholder="Enter Password"
                  type="password"
                  size="small"
                  variant="outlined"
                  onChange={({ target }) => _setPassword(target.value)}
                />
              </Box>
            </Grid>

            <Box mt={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {isLogging && <CircularProgress size={20} color="white" />}
                Login
              </Button>
            </Box>
            <Box mt={2}>
              <Button
                onClick={closeDialog}
                fullWidth
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>

            <Box mt={1} align="center">
              <Button color="primary">Forgot Your Password?</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  isLogging: state.userReducer.isLogging,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: bindActionCreators(login, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
  },
}));
