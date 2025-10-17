import { showErrorToast } from '@/lib/utils';
import { authService } from '@/services/auth.service';
import { useUser } from '@/store/user';
import { IApiError } from '@/types/apiError.types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignInQuery = () => {
  const navigate = useNavigate();
  const setUser = useUser((state) => state.setUser)


  return useMutation({
    mutationFn: authService.signin,
    onSuccess: (data) => {
      const { accessToken, ...rest } = data
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_TOKEN, accessToken);
      setUser({ ...rest })

      navigate('/dashboard');
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  });
};