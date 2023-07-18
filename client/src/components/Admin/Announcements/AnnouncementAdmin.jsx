import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { motion as m } from "framer-motion";

export default function AnnouncementAdmin({ id }) {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <div className="main-container homepage">
        <Snackbar
          open={errorMessage !== ""}
          autoHideDuration={4000}
          onClose={() => setErrorMessage("")}
        >
          <Alert
            onClose={() => setErrorMessage("")}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        <m.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75 }}
          className="heading"
        >
          Welcome Admin
        </m.div>
        <m.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75 }}
        >
          this is delayed
        </m.div>
      </div>
    </>
  );
}
