import CloseOutlined from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export const ImageInput = (props: {
  name: string;
  register: UseFormRegister<any>;
  blob: FileList | undefined;
  setValue: UseFormSetValue<any>;
  label: string;
  required?: boolean;
  defaultValue?: string;
}) => {
  const { name, register, blob, setValue, label } = props;
  let [imagePreview, setImagePreview] = useState(props.defaultValue);

  useEffect(() => {
    if (blob === undefined || !(blob[0] as File)?.size) return;
    var reader = new FileReader();

    if (blob[0].size > 2 * 1000000 /* 8 MB */) {
      alert(`La imagen es demasiado grande.
      
      Las imágenes no pueden pesar más de 8MB`);
      return setValue('imageBlob', undefined)
    }
    reader.readAsDataURL(blob[0]);
    reader.onload = () => {
      let encoded = reader.result!.toString().replace(/^data:(.*,)?/, '');
      if (encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      const imageBase64 = `data:text/css;base64,${encoded}`;
      setImagePreview(imageBase64);
    };
  }, [blob]);

  return (
    <>
      {!!label && <label htmlFor={name}>{label}</label>}
      <input
        type="file"
        {...register('imageBlob', { required: props.required })}
        id={name}
        accept="image/*"
      />
      {!!imagePreview && (
        <div className="max-w-xs mx-auto w-full relative mt-4">
          <img src={imagePreview} alt="" className="w-full" />
          <IconButton
            className="!text-red-500 !absolute !top-2 !right-2
    !bg-surface-2 !rounded-full !w-8 !h-8"
            onClick={() => {
              if (confirm('¿Quieres borrar la imagen?')) {
                setValue(props.name, '', {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
                setValue('imageBlob', undefined, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
                setImagePreview('');
              }
            }}
          >
            <CloseOutlined />
          </IconButton>
        </div>
      )}
    </>
  );
};
