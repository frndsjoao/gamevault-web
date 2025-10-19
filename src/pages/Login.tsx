import { useState, FormEvent } from 'react';
import { BaseView, Button, Card, Checkbox, Input } from '../components';
import Link from '../components/common/Link';
import { useSignInQuery } from '@/hooks/mutations/useAuth';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false)

  const { mutate: signIn, isPending } = useSignInQuery();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email, password })
  };

  return (
    <BaseView>
      <Card className='max-w-md'>
        <h2 className='mb-2 text-xl font-semibold text-text-light'>
          Login to your account
        </h2>
        <p className='mb-6 text-sm font-normal text-text-medium'>
          Enter your email below to login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            required
            type='email'
            label='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            icon="user"
          />
          <div>
            <Input
              required
              type={showPassword ? "text" : 'password'}
              label='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              icon={showPassword ? "eye" : "eyeOff"}
            />
            <Checkbox
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              label={`${showPassword ? "Hide" : "Show"} your password`}
            />
          </div>

          <div className='flex flex-col items-center border-t-[1px] border-t-text-medium pt-4'>
            <Button type="submit" label='Login' isLoading={isPending} />
            <Link label='Criar conta' />
          </div>
        </form>
      </Card>
    </BaseView>
  );
}
