import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Select,MenuItem,TextField  } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelectField.propTypes = {
  name: PropTypes.string,
};

export default function RHFSelectField( { name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        id="select"
        {...field}
        fullWidth
        value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
        error={!!error}
        helperText={error?.message}
        {...other}
      >
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty</MenuItem>
      </TextField>
    )}
  />
  );
}
