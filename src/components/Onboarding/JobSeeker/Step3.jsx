import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  TextareaAutosize,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { uploadFileApi } from "../../../api/common";

const Step3 = ({ back, finish, initialData }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [resume, _setResume] = useState();
  const [userPhoto, _setUserPhto] = useState();
  const [about, _setAbout] = useState("");
  const [isResumeUploading, _setIsResumeUploading] = useState(false);
  const [isProfilePicUploading, _setIsProfilePicUploading] = useState(false);

  useEffect(() => {
    if (initialData.resume) _setResume(initialData.resume);
  }, []);

  const handleBack = () => {
    back();
  };

  const handleSubmit = () => {
    if (!resume) {
      enqueueSnackbar("Please upload your resume.", { variant: "error" });
      return;
    }

    if (!userPhoto) {
      enqueueSnackbar("Please upload your Profile Picture.", {
        variant: "error",
      });
      return;
    }

    if (!about) {
      enqueueSnackbar("Please add about your self.", { variant: "error" });
      return;
    }
    finish({ resume, about, userPhoto });
  };

  const handleFileChange = (e, key) => {
    if (!e.target.files[0]) return;

    key === "resume"
      ? _setIsResumeUploading(true)
      : _setIsProfilePicUploading(true);

    const { files } = e.target;
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    uploadFileApi(formData)
      .then((result) => {
        enqueueSnackbar(
          `${files.length > 1 ? "Files" : "File"} Uploaded Successfully.`,
          { variant: "success" }
        );
        if (key === "resume") {
          result.data.data?.[0] && _setResume(result.data.data[0]);
          _setIsResumeUploading(false);
        } else {
          result.data.data?.[0] && _setUserPhto(result.data.data[0]);
          _setIsProfilePicUploading(false);
        }
      })
      .catch((error) => {
        enqueueSnackbar(`Error uploading files. Please try again.`, {
          variant: "error",
        });
        key === "resume"
          ? _setIsResumeUploading(false)
          : _setIsProfilePicUploading(false);
      });
  };

  return (
    <>
      <Box mb={5} align="center">
        <Typography variant="h4" className="skill_form_titile">
          Step 3/3: Upload Resume
        </Typography>
        <Typography variant="subtitle2" className="skill_form_titile">
          An updated resume is key to being shortlisted.
        </Typography>
      </Box>

      <Grid item>
        <Grid container direction="column">
          <form>
            <Grid item>
              <Typography variant="subtitle2" className={classes.label}>
                Upload Your Resume :
              </Typography>
              <div className={classes.fileDropZone}>
                <input
                  className={classes.fileInputControl}
                  onChange={(e) => handleFileChange(e, "resume")}
                  type="file"
                  accept="application/pdf, text/docx, image/jpeg, image/png"
                />
                {isResumeUploading && (
                  <div className={classes.loadingOverlay}>
                    <CircularProgress />
                  </div>
                )}
              </div>
            </Grid>

            <Grid item>
              <Box mt={2}>
                <Typography variant="subtitle2" className={classes.label}>
                  Upload Your Profile Picture :
                </Typography>
                <div className={classes.fileDropZone}>
                  <input
                    className={classes.fileInputControl}
                    onChange={(e) => handleFileChange(e, "userPhoto")}
                    type="file"
                    accept="application/pdf, text/docx, image/jpeg, image/png"
                  />
                  {isProfilePicUploading && (
                    <div className={classes.loadingOverlay}>
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </Box>
            </Grid>

            <Grid item>
              <Box mt={2}>
                <Typography variant="subtitle2" className={classes.label}>
                  Tell us about you:
                </Typography>
                <TextField
                  maxRows={7}
                  minRows={3}
                  fullWidth
                  aria-label="aboutYou"
                  value={about}
                  onChange={({ target }) => _setAbout(target.value)}
                />
              </Box>
            </Grid>

            <Grid item>
              <Box
                mt={4}
                justifyContent="space-between"
                className={classes.buttonContainer}
              >
                <Button
                  size="large"
                  onClick={handleBack}
                  endIcon={<ArrowBackIcon />}
                  variant="outlined"
                  color="primary"
                >
                  Back
                </Button>

                <Button
                  size="large"
                  onClick={handleSubmit}
                  endIcon={<ArrowForwardIcon />}
                  variant="outlined"
                  disabled={!about || !resume}
                  color="primary"
                >
                  Finish
                </Button>
              </Box>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Step3;

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
  },

  fileDropZone: {
    minHeight: 200,
    width: "auto",
    border: "2px dashed grey",
    borderRadius: 5,
    position: "relative",
  },

  fileInputControl: {
    minHeight: 200,
    height: "100%",
    width: "100%",
    opacity: 0,
  },
  buttonContainer: {
    display: "flex",
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.1)",
  },
}));
