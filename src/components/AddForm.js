import React, { useEffect, useRef } from 'react';
import { FormControl, Stack, TextField, Select, InputLabel, MenuItem,} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { addDoc } from 'firebase/firestore';
// import { db } from '../db/firebase';
import { userRegsistrationRef } from '../db/firestore.collections';
// import Iconify from '../components/Iconify';

// import Label from 'src/components/Label';
// import { useState } from 'react';

export default function AddUsers() {
  // const options = [
  //   'Frontend Developer',
  //   'BackEnd Developer',
  //   'Full Stack Developer'
  // ];

  // const [userList, setUserList] = useState([]);

  // const [userrole, setUserRole] = useState('');
  // const handleChange = (event) => {
  //   setUserRole(event.target.value);
  //   console.log(event.target.value);
  //   console.log(setUserRole(event.target.value));
  // };
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const userRoleRef = useRef();
  const emailAddressRef = useRef();

  // const [firstname, setFirstName] = useState('');

  // const [lastname, setLastName] = useState('');

  // const [emailaddress, setEmailAddress] = useState('');
  // const [userrole, setUserrole] = useState('');

  useEffect(() => {}, []);
  // const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const result = {
      username: userNameRef.current.value,
      firstname: firstNameRef.current.value,
      lastname: lastNameRef.current.value,
      userrole: userRoleRef.current.value,
      emailaddress: emailAddressRef.current.value,
    };
    const { username, firstname, lastname, userrole, emailaddress } = result;
    // const userRegsistrationRef = collection(db, 'UserRegistration');
    //  const userList= [];
    addDoc(userRegsistrationRef, { username, firstname, lastname, userrole, emailaddress })
      .then((response) => {
        // userList.push(response)
        console.log(response,"updatinggggggggggggggg");
      })
      .catch((err) => {
        console.log(err.message);
      });

    //  setUserList(userList);t

    // if (username === '') {
    //   return;
    // }

    // const registeredusersCollRef = collection(db, 'registeredusers');
    // addDoc(registeredusersCollRef, { username, userrole, firstname, lastname, emailaddress })
    //   .then((response) => {
    //     console.log(response.id);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

</Stack> */}
            {/* <InputLabel htmlFor='username' id="username">username</InputLabel> */}
            <TextField name="userName" label="User name" id="username" type="text" inputRef={userNameRef} />
            {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
              <InputLabel id="userrolelabel">Role</InputLabel>
              <Select id="userrole" name="userrole" inputRef={userRoleRef}>
                <MenuItem value="frontend developer">Frontend Developer</MenuItem>
                <MenuItem value="backend developer">Backend Developer</MenuItem>
                <MenuItem value="fullstack developepr">FullStack Developer</MenuItem>
              </Select>
            {/* </FormControl> */}
            {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <InputLabel htmlFor='firstname' id="firstname">Role</InputLabel>

                              <InputLabel htmlFor='lastname' id="lastname">Role</InputLabel>

            </Stack> */}
            <TextField name="firstName" label="First name" id="firstname" type="text" inputRef={firstNameRef} />
            <TextField name="lastName" label="Last name" id="lastname" type="text" inputRef={lastNameRef} />

            <TextField name="emailaddress" id="emailaddress" type="email" inputRef={emailAddressRef} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {/* <TextField
                id='password'
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
              /> */}
              {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            </Stack> */}
            </Stack>
            <LoadingButton fullWidth size="large" type="submit" variant="contained">
              Register
            </LoadingButton>
          </Stack>
        </form>
      </div>
    
    </>
  );
}
