import { TextField } from '@mui/material';
import { Group } from '../../components/Form';

export default function Step1({ register, errors }) {
  return (
    <>
      <Group>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          {...register('fullName', { required: 'Please tell us your name' })}
          error={errors.fullName}
          helperText={errors.fullName?.message}
        />
      </Group>
      <Group>
        <TextField
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          type="number"
          {...register('phoneNumber', {
            required: 'Please tell us your phone number',
            minLength: {
              value: 10,
              message: 'Your phone number must be have 10 digits',
            },
            maxLength: {
              value: 10,
              message: 'Your phone number must be have 10 digits',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Solo se permiten números',
            },
          })}
          error={errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
      </Group>
      <Group>
        <TextField
          id="outlined-basic"
          label="Years old"
          variant="outlined"
          {...register('age', {
            required: 'Please tell us your years old',
            valueAsNumber: true,
            min: { value: 10, message: 'Your age should be greater that 10' },
            max: { value: 100, message: 'Your age should be less that 100' },
          })}
          error={errors.age}
          helperText={errors.age?.message}
        />
      </Group>
      <Group>
        <TextField
          id="outlined-basic"
          label="introduce a comment"
          variant="outlined"
          {...register('comment', { required: 'Please introduce a comment' })}
          error={errors.comment}
          helperText={errors.comment?.message}
        />
      </Group>
    </>
  );
}
