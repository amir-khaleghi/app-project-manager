'use client';
// ─── Imports ──────────────────────────────────────── 🟩 ─

import { register, signin } from '@/lib/api';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from './Card';
import Button from './Button';
import Input from './Input';

/* Mode Objects --------------------- */
const registerContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
};

const signinContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
};
/* Initial State -------------------- */
const initial = { email: '', password: '', firstName: '', lastName: '' };

// ─── Comp ─────────────────────────────────────────── 🟩 ─

const AuthForm = ({ mode }: { mode: 'register' | 'signin' }) => {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (mode === 'register') {
          await register(formState);
        } else {
          await signin(formState);
        }
        //NOTE    replace prevent from backing to firs route
        router.replace('/home');
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );

  const content = mode === 'register' ? registerContent : signinContent;

  return (
    <Card className="">
      <div className="text-center bg-purple-400 h-full w-full shadow-2xl rounded-t-2xl p-4">
        <h2 className="text-3xl mb-2 ">{content.header}</h2>
        {/* <p className="tex-lg text-black/25">{content.subheader}</p> */}
      </div>
      <div className="w-full  p-8">
        <form
          onSubmit={handleSubmit}
          className="py-10 w-full"
        >
          {mode === 'register' && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Link
                prefetch
                href={content.linkUrl}
                className="text-blue-600 font-bold"
              >
                {content.linkText}
              </Link>
            </div>
            <div>
              <Button
                className="p-2"
                type="submit"
                intent="primary"
              >
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AuthForm;
