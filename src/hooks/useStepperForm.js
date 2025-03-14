import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useStepperForm = (steps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleCleanInputs = () => reset();

  const handleNext = async () => {
    const continueStep = await verifyStep();
    if (!continueStep) return;

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    if (newActiveStep === activeStep) return;
    setActiveStep(newActiveStep);
    setCompleted({ ...completed, [activeStep]: true });
  };

  const handleBack = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    reset();
  };

  // Form data watchers
  const fullName = watch('fullName');
  const phoneNumber = watch('phoneNumber');
  const age = watch('age');
  const comment = watch('comment');
  const street = watch('street');
  const city = watch('city');
  const postalCode = watch('postalCode');
  const country = watch('country');
  const companyName = watch('companyName');
  const jobTitle = watch('jobTitle');
  const yearsExperience = watch('yearsExperience');
  const salary = watch('salary');
  const responsibilities = watch('responsibilities');

  const onSubmit = () => {
    handleComplete();
    setOpen(true);
  };

  const handleClose = () => {
    handleCleanInputs();
    setOpen(false);
  };

  const verifyStep = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid =
          (await trigger('fullName')) &&
          (await trigger('phoneNumber')) &&
          (await trigger('age'));
        break;
      case 1:
        isValid =
          (await trigger('street')) &&
          (await trigger('city')) &&
          (await trigger('postalCode')) &&
          (await trigger('country'));
        break;
      case 2:
        isValid =
          (await trigger('companyName')) &&
          (await trigger('jobTitle')) &&
          (await trigger('yearsExperience')) &&
          (await trigger('salary')) &&
          (await trigger('responsibilities'));
        break;
      default:
        break;
    }
    return isValid;
  };

  return {
    handleClose,
    open,
    activeStep,
    completed,
    totalSteps,
    completedSteps,
    isLastStep,
    allStepsCompleted,
    handleComplete,
    handleCleanInputs,
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
  };
};
