import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment,Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useUserAuth } from '../../../context/UserAuthContextProvider';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox,RHFSelectField} from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const options = {
     frontEnd: 'Forntend Developer',
     backEnd: 'Forntend Developer',
     fullStack: 'Full stack Developer'
  }

  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState("");

  const {logIn}= useUserAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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
        await logIn(userEmail,userPassword);
        navigate('/dashboard', { replace: true });
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
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* <RHFSelectField name="test"/> */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        LogIn
      </LoadingButton>
    </FormProvider>
  );
}
