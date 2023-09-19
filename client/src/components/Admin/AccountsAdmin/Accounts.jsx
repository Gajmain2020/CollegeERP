import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkForToken, decodeToken } from "../../../services/common";

export default function Accounts({ id }) {
  const navigate = useNavigate();

  const [userDetailes, setUserDetails] = useState(null);

  useEffect(() => {
    checkForToken()
      .then((res) => {
        return res;
      })
      .then((res) => {
        if (res.tokenExists === false) {
          navigate("/not-logged-in");
        }
        return decodeToken(res.token);
      })
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => alert(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="homepage">
        <div className="heading">Welcome To Accounts Section</div>
        <div className="button-container">
          <div className="button-row">
            <Button
              fullWidth
              onClick={() =>
                navigate(
                  `/admin/${userDetailes.department}/release-fee-payment-notice/${userDetailes.id}`
                )
              }
            >
              Release Fee Payment Notice
            </Button>
            <Button
              fullWidth
              onClick={() => {
                navigate(
                  `/admin/${userDetailes.department}/send-fee-payment-remainder/${userDetailes.id}`
                );
              }}
            >
              Send Fee Payment Remainder
            </Button>
          </div>
          <div className="button-row">
            <Button
              fullWidth
              onClick={() => {
                navigate(
                  `/admin/${userDetailes.department}/create-fee-structure/${userDetailes.id}`
                );
              }}
            >
              Create Fee Structure
            </Button>
            <Button fullWidth>View Fee Paid List</Button>
          </div>
          <div className="button-row">
            <Button
              fullWidth
              onClick={() => {
                navigate(
                  `/admin/${userDetailes.department}/add-offline-fee-detail/${userDetailes.id}`
                );
              }}
            >
              Add Offline Payment
            </Button>
            <Button fullWidth>Complaint Resolution</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
