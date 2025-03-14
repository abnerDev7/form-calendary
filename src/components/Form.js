'use client';

import * as React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

export const FormStyled = styled.form`
  width: 400px;
  margin: 100px auto;
  background-color: #f8f9fa;
  padding: 40px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
`;
export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  & label {
    color: #343a40;
    font-weight: 500;
  }
`;

export const BoxSyled = styled(Box)`
  background-color: #f8f9fa;
  border-radius: 11px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  text-align: center;

  h2 {
    text-align: center;
  }

  & p {
    font-weight: 500;
  }
`;

// const Form1 = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const fullName = watch('fullName');
//   const phoneNumber = watch('phoneNumber');
//   const age = watch('age');
//   const comment = watch('comment');

//   const [open, setOpen] = useState(false);

//   const handleClose = () => {
//     handleCleanInputs();
//     setOpen(false);
//   };

//   const handleCleanInputs = () => {
//     reset();
//   };

//   const onSubmit = () => {
//     if (Object.keys(errors).length > 0) return;
//     setOpen(true);
//   };

//   return (
//     <>
//       <FormStyled onSubmit={handleSubmit(onSubmit)}>
//         <Group>
//           <TextField
//             id="outlined-basic"
//             label="Full Name"
//             variant="outlined"
//             {...register('fullName', { required: 'Please tell us your name' })}
//             error={errors.fullName}
//             helperText={errors.fullName?.message}
//           />
//         </Group>
//         <Group>
//           <TextField
//             id="outlined-basic"
//             label="Phone number"
//             variant="outlined"
//             type="number"
//             {...register('phoneNumber', {
//               required: 'Please tell us your phone number',
//               minLength: {
//                 value: 10,
//                 message: 'Your phone number must be have 10 digits',
//               },
//               maxLength: {
//                 value: 10,
//                 message: 'Your phone number must be have 10 digits',
//               },
//               pattern: {
//                 value: /^[0-9]+$/,
//                 message: 'Solo se permiten números',
//               },
//             })}
//             error={errors.phoneNumber}
//             helperText={errors.phoneNumber?.message}
//           />
//         </Group>
//         <Group>
//           <TextField
//             id="outlined-basic"
//             label="Years old"
//             variant="outlined"
//             {...register('age', {
//               required: 'Please tell us your years old',
//               valueAsNumber: true,
//               min: { value: 10, message: 'Your age should be greater that 10' },
//               max: { value: 100, message: 'Your age should be less that 100' },
//             })}
//             error={errors.age}
//             helperText={errors.age?.message}
//           />
//         </Group>
//         <Group>
//           <TextField
//             id="outlined-basic"
//             label="introduce a comment"
//             variant="outlined"
//             {...register('comment', { required: 'Please introduce a comment' })}
//             error={errors.comment}
//             helperText={errors.comment?.message}
//           />
//         </Group>

//         <Group>
//           <Button variant="contained" type="submit">
//             Enviar formulario
//           </Button>
//         </Group>

//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="parent-modal-title"
//           aria-describedby="parent-modal-description"
//         >
//           <BoxSyled sx={{ ...style, width: 400 }}>
//             <h2>Data form</h2>
//             <p>FullName: {fullName}</p>
//             <p>Phone number: {phoneNumber}</p>
//             <p>Years Old: {age}</p>
//             <p>Comment: {comment}</p>
//             <Button variant="contained" color="error" onClick={handleClose}>
//               Close
//             </Button>
//           </BoxSyled>
//         </Modal>
//       </FormStyled>
//     </>
//   );
// };

// export default Form1;
