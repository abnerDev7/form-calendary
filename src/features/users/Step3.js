import { TextField } from '@mui/material';
import { Group } from '../../components/Form';

export default function Step3({ register, errors }) {
  return (
    <>
      <Group>
        <TextField
          label="Company Name"
          variant="outlined"
          {...register('companyName', {
            required: 'Please enter your company name',
          })}
          error={errors.companyName}
          helperText={errors.companyName?.message}
        />
      </Group>
      <Group>
        <TextField
          label="Job Title"
          variant="outlined"
          {...register('jobTitle', {
            required: 'Please enter your job title',
          })}
          error={errors.jobTitle}
          helperText={errors.jobTitle?.message}
        />
      </Group>
      <Group>
        <TextField
          label="Years of Experience"
          variant="outlined"
          type="number"
          {...register('yearsExperience', {
            required: 'Please enter your years of experience',
            min: {
              value: 0,
              message: 'Experience cannot be negative',
            },
            max: {
              value: 50,
              message: 'Experience should be realistic',
            },
          })}
          error={errors.yearsExperience}
          helperText={errors.yearsExperience?.message}
        />
      </Group>
      <Group>
        <TextField
          label="Salary (Optional)"
          variant="outlined"
          type="number"
          {...register('salary')}
        />
      </Group>
      <Group>
        <TextField
          label="Responsibilities"
          variant="outlined"
          multiline
          rows={3}
          {...register('responsibilities', {
            required: 'Please describe your responsibilities',
          })}
          error={errors.responsibilities}
          helperText={errors.responsibilities?.message}
        />
      </Group>
    </>
  );
}
