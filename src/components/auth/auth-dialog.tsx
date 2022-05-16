import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { useState } from 'react';

type AuthDialogProps = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  handleClose: () => void;
  description: string;
};

export function AuthDialog({ defaultOpen, open, onOpenChange, handleClose, description }: AuthDialogProps) {
  const [showLoginForm, setShowLoginForm] = useState(true);

  function afterLogin() {
    handleClose();
    window.location.reload();
  }

  function switchToSignupForm(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setShowLoginForm(false);
  }

  function switchToLoginForm(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setShowLoginForm(true);
  }

  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="mx-auto flex w-4/5 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-2xl font-bold text-gray-900">Log in or create a new account</h2>
            <p className="text-center text-sm">{description}</p>
          </div>
          {showLoginForm ? (
            <>
              <LoginForm afterLogin={afterLogin} />
              <p className="text-center text-sm text-gray-600">
                {"Don't have an account? "}
                <a className="font-medium text-pink-600 hover:text-pink-400" onClick={switchToSignupForm}>
                  Sign up here.
                </a>
              </p>
            </>
          ) : (
            <>
              <SignupForm />
              <p className="text-center text-sm text-gray-600">
                {'Already have an account? '}
                <a className="font-medium text-pink-600 hover:text-pink-400" onClick={switchToLoginForm}>
                  Log in here.
                </a>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
