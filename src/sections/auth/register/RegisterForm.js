import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'

// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import Iconify from '../../../components/iconify';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register: userRegister } = useAuth()
  const { enqueueSnackbar } = useSnackbar()


  const [showPassword, setShowPassword] = useState(false);

  const registerSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = (values) => {
    userRegister(values).then(() => {
      enqueueSnackbar('User logged in successfully', { variant: 'success' });
      if (location.pathname === '/register') {
        navigate('/')
      }
    }).catch(e => {
      enqueueSnackbar(e.message, { variant: 'error' });
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mb={5}>
        <TextField
          name="userName"
          label="User Name"
          {...register("username")}
          helperText={errors.username && errors.username.message}
          error={Boolean(errors.username)} />
        <TextField name="email" label="Email address" {...register("email")}
          helperText={errors.email && errors.email.message}
          error={Boolean(errors.email)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register("password")}
          helperText={errors.password && errors.password.message}
          error={Boolean(errors.password)}
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
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Register
      </LoadingButton>
    </form>
  );
}
