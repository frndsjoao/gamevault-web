import { useState, FormEvent } from 'react';
import { BaseView, Button, Card, Checkbox, Input } from '../components';
import Link from '../components/common/Link';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <BaseView>
      <Card>
        <h2>
          Gamevault
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            type='email'
            label='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            icon="user"
          />
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
            label={`${showPassword ? "Ocultar" : "Mostrar"} senha`}
          />

          <div className='flex flex-col items-center border-t-[1px] border-t-gray-700 pt-4'>
            <Button label='Login' />
            <Link label='Criar conta' />
          </div>
        </form>
      </Card>
    </BaseView>
  );
}
