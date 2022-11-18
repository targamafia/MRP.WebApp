import { FieldValues, useForm } from 'react-hook-form';
import { Input } from '@/shared/components/input';
import { useCreateUser } from '../../hooks/useUserHooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IUser } from '../../models';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { Message } from '@/shared/components/message';
export const NewUserForm = () => {
  const [message, setMessage] = useState<{ type: string; content: string }>();
  const [created, setCreated] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { name: '', lastName: '', role: '', email: '' },
  });

  const onSuccess = (user: IUser) => {
    setMessage({
      type: 'info',
      content: `"Se creó la cuenta de ${user.email}" y se le envió un código para generar su contraseña.`,
    });
    setCreated(true);
    setTimeout(() => navigate(-1), 2000);
  };

  const { mutate, error, isLoading } = useCreateUser(onSuccess);
  const navigate = useNavigate();

  return (
    <HandleAsyncData error={error} loading={isLoading}>
      {() => (
        <form
          onSubmit={handleSubmit((formData) => mutate(formData))}
          className="flex flex-col gap-4"
        >
          <Input type="text" name="name" register={register} required={true} />
          <Input
            type="text"
            name="lastName"
            register={register}
            required={true}
            label="Last Name"
          />
          <Input
            type="email"
            name="email"
            register={register}
            required={true}
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="role">Tipo de usuario:</label>
            <select {...register('role', { required: true })}>
              <option value="">Rol</option>
              <option value="admin">Administrador</option>
              <option value="consumer">Usuario</option>
            </select>
          </div>
          {!created && (
            <input
              type="submit"
              value="Crear"
              className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
            />
          )}
          {!!message && (
            <Message message={message.content} type={message.type} />
          )}
        </form>
      )}
    </HandleAsyncData>
  );
};
