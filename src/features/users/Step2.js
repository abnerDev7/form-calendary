import { TextField } from '@mui/material';
import { Group } from '../../components/Form';

export default function Step2({ register, errors }) {
  return (
    <>
      <Group>
        <TextField
          label="Street Address"
          variant="outlined"
          {...register('street', {
            required: 'Please enter your street address',
          })}
          error={!!errors.street}
          helperText={errors.street?.message}
        />
      </Group>
      <Group>
        <TextField
          label="City"
          variant="outlined"
          {...register('city', {
            required: 'Please enter your city',
          })}
          error={!!errors.city}
          helperText={errors.city?.message}
        />
      </Group>
      <Group>
        <TextField
          label="Postal Code"
          variant="outlined"
          type="number"
          {...register('postalCode', {
            required: 'Please enter your postal code',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Only numbers are allowed',
            },
          })}
          error={!!errors.postalCode}
          helperText={errors.postalCode?.message}
        />
      </Group>
      <Group>
        <TextField
          label="Country"
          variant="outlined"
          {...register('country', {
            required: 'Please enter your country',
          })}
          error={!!errors.country}
          helperText={errors.country?.message}
        />
      </Group>
    </>
  );
}
