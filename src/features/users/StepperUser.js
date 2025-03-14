'use client';

import { lazy, Suspense, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { FormStyled } from '../../components/Form';
import ModalWindow from '../../components/ModalWindow';
import { useStepperForm } from '@/hooks/useStepperForm';

const steps = ['Personal data', 'direction', 'Job Information'];

const Step1 = lazy(() => import('./Step1'));
const Step2 = lazy(() => import('./Step2'));
const Step3 = lazy(() => import('./Step3'));

export default function StepperUser() {
  const {
    open,
    activeStep,
    completed,
    totalSteps,
    completedSteps,
    allStepsCompleted,
    handleNext,
    handleBack,
    handleStep,
    handleReset,
    register,
    handleSubmit,
    errors,
    fullName,
    phoneNumber,
    age,
    comment,
    street,
    city,
    postalCode,
    country,
    companyName,
    jobTitle,
    yearsExperience,
    salary,
    responsibilities,
    onSubmit,
    handleCleanInputs,
    handleClose,
  } = useStepperForm(steps);

  return (
    <Box sx={{ width: '65%', margin: '6rem auto' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <FormStyled onSubmit={handleSubmit(onSubmit)}>
            {/* STEPS */}
            <Suspense fallback={<div>Loading...</div>}>
              {activeStep === 0 && (
                <Step1 register={register} errors={errors} />
              )}
              {activeStep === 1 && (
                <Step2 register={register} errors={errors} />
              )}
              {activeStep === 2 && (
                <Step3 register={register} errors={errors} />
              )}
            </Suspense>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {/*   BUTTON BACK */}
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                type="button"
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              {/* BUTTON NEXT  */}
              {activeStep !== 2 && (
                <Button onClick={handleNext} sx={{ mr: 1 }} type="button">
                  Next
                </Button>
              )}

              {/* FINISH */}
              {activeStep === 2 && (
                <Button type="submit">
                  {completedSteps() === totalSteps() - 1
                    ? 'Finish'
                    : 'Complete Step'}
                </Button>
              )}
            </Box>
          </FormStyled>
        )}
      </div>

      <ModalWindow handleClose={handleClose} open={open}>
        <h2>Personal data</h2>
        <p>FullName: {fullName}</p>
        <p>Phone number: {phoneNumber}</p>
        <p>Years Old: {age}</p>
        <p>Comment: {comment}</p>

        <h2>Address Information</h2>
        <p>Street: {street}</p>
        <p>City: {city}</p>
        <p>Postal Code: {postalCode}</p>
        <p>Country: {country}</p>

        <h2>Job Information</h2>
        <p>Company Name: {companyName}</p>
        <p>Job Title: {jobTitle}</p>
        <p>Years of Experience: {yearsExperience}</p>
        <p>Salary: {salary}</p>
        <p>Responsibilities: {responsibilities}</p>
      </ModalWindow>
    </Box>
  );
}
