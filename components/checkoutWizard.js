import { Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import useStyles from "../utils/styles";

export default function CheckoutWizard({ activeStep = 0 }) {
  const classes = useStyles();
  const arrStep = [
    "Login",
    "Shipping Address",
    "Payment Method",
    "Place Order",
  ];
  return (
    <Stepper
      className={classes.transparentBackgroud}
      activeStep={activeStep}
      alternativeLabel
    >
      {arrStep.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}