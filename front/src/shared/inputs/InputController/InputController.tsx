import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import Input from '../Input/Input';

interface InputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  isError?: boolean;
}

const InputController = <T extends FieldValues>({
  control,
  name,
  isError,
}: InputControllerProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, ref, value } }) => (
      <Input
        value={value}
        type="text"
        placeholder="Nom du type"
        onChange={onChange}
        onBlur={onBlur}
        refs={ref}
        additionalClass={twMerge(
          isError && '!border-red-500 border !border-1 text-red-500',
          'bg-transparent border rounded border-gray-1 active:border-secondary border pr-10',
        )}
      />
    )}
  />
);

export default InputController;
