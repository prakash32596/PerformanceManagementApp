// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useState } from 'react';

// router
import { useNavigate } from 'react-router-dom';

// component
import Iconify from '../../components/Iconify';
// import {signInWithGoogle}  from './SignInWithGoogle';
import { useUserAuth } from '../../context/UserAuthContextProvider';

// ----------------------------------------------------------------------

export default function AuthSocial() {

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const {googleSignIn} = useUserAuth();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate('/dashboard/app', { replace: true });
    } catch (err) {
      setError(err.message);
      
    }
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleGoogleSignIn}>
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
