import { useForm } from 'react-hook-form';
import { Input } from '@/shared/components/input';
export const NewUserForm = () => {
  const { register, handleSubmit } = useForm();
  return (
    <form
      onSubmit={handleSubmit(() => {
        try {
        } catch {}
      })}
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
      <Input type="email" name="email" register={register} required={true} />
      <Input
        type="text"
        name="companyCode"
        register={register}
        label="Company Code"
      />
      <input
        type="submit"
        value="Crear"
        className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
      />
    </form>
  );
};
