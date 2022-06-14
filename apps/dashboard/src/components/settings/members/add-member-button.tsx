import { useMembers } from '@components/providers';
import { PlusIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { createMember } from '@myhearty/lib/organizations';
import { Alert } from '@myhearty/ui/alert';
import { EmailInput, Form, PasswordInput } from '@myhearty/ui/form';
import { showToast } from '@myhearty/utils/show-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddMemberButton() {
  const modals = useModals();
  const { setPageIndex } = useMembers();

  const openAddMemberModal = () => {
    const id = modals.openModal({
      centered: true,
      title: 'Add new member',
      children: (
        <AddMemberModal
          onClose={() => {
            modals.closeModal(id);
            setPageIndex(1);
          }}
        />
      ),
    });
  };

  return (
    <Button size="xs" leftIcon={<PlusIcon className="h-3 w-3" />} onClick={openAddMemberModal}>
      Add Member
    </Button>
  );
}

type AddMemberModalProps = {
  onClose: () => void;
};

type AddMemberFormData = {
  email: string;
  password: string;
};

function AddMemberModal({ onClose }: AddMemberModalProps) {
  const form = useForm<AddMemberFormData>();
  const {
    formState: { isSubmitting },
    register,
  } = form;
  const [errorMessage, setErrorMessage] = useState<string>();

  async function handleCreateMember({ email, password }: AddMemberFormData) {
    try {
      setErrorMessage('');

      await createMember(email, password);
      showToast(
        `Successfully added ${email}. A confirmation email has been sent to verify the new member account.`,
        'success'
      );

      onClose();
    } catch (error) {
      setErrorMessage('Email has already been taken.');
    }
  }

  return (
    <Form className="flex flex-col gap-6" form={form} handleSubmit={handleCreateMember}>
      <EmailInput id="email" label="Email Address" required {...register('email')} />
      <PasswordInput
        label="Password"
        required
        {...register('password', {
          minLength: {
            value: 6,
            message: 'Password is too short (minimum is 6 characters)',
          },
        })}
      />
      {errorMessage && <Alert severity="error" title={errorMessage} />}
      <Button fullWidth type="submit" loading={isSubmitting}>
        Add member
      </Button>
    </Form>
  );
}
