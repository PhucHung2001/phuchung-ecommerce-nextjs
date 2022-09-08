import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import CheckoutWizard from "../components/checkoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import { useSnackbar } from "notistack";
export default function Payment() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  const [paymentMethod, setPaymentMethod] = useState("");
  console.log(
    "🚀 ~ file: payment.js ~ line 31 ~ Payment ~ paymentMethod",
    paymentMethod
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shippingg");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "");
    }
  }, []);
  const handleSubmit = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar("Payment method is required", { variant: "error" });
    } else {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
      Cookies.set("paymentMethod", paymentMethod);
      router.push("/placeorder");
    }
  };
  const backShipping = () => {
    router.push("/shipping");
  };

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={handleSubmit}>
        {" "}
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Paypal"
                  value="Paypal"
                  control={<Radio />}
                ></FormControlLabel>
                {/* <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel> */}
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Coutinue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              onClick={backShipping}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
