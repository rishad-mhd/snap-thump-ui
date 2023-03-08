import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
// @mui
import {  Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = (values) => {
    login(values).then((res) => {
      enqueueSnackbar(res.message, { variant: 'success' })
      if (location.pathname === '/login') {
        navigate('/')
      }
    }).catch((e) => {
      enqueueSnackbar(e.message, { variant: 'error' })
    })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mb={5}>
        <TextField
          name="email"
          label="Email address"
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </form>
  );
}
