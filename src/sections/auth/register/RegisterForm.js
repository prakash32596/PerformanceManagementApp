import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useUserAuth } from '../../../context/UserAuthContextProvider';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState("");

    // const [email,setEmail]= useState("");
    // const [password,setPassword]= useState("");
    // const [firstName,setFirstName]= useState("");
    // const [lastName,setLastName]= useState("");

  const {signUp}= useUserAuth();

  
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };


  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
      setError("")
      // const {firstName,lastName,email,password}= e; 
      // const userFirstName = e.firstName;
      // const userLastName = e.lastName;
      const userEmail = e.email;
      const userPassword = e.password;
      try{
        await signUp(userEmail,userPassword);
        navigate('/', { replace: true });
      } catch(err){
        setError(err.message)
      }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
     { error &&  <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{error}</Alert>
      </Stack>}
      <Stack spacing={3}>
        {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name"  />
          <RHFTextField name="lastName" label="Last name"  />
        </Stack> */}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
