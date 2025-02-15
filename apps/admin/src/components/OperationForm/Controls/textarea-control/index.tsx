import { Textarea, TextareaProps, UseDisclosureProps } from '@chakra-ui/react'
import { get, isNil } from 'lodash'
import { FC, useCallback } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { BaseProps, FormControl } from '../form-control'

export interface TextareaControlProps extends BaseProps {
  /**
   * Chakra TextareaProps
   */
  textareaProps?: TextareaProps
  editExpressionDisclosure?: UseDisclosureProps
}

export const TextareaControl: FC<TextareaControlProps> = (props: TextareaControlProps) => {
  const { name, control, textareaProps, editExpressionDisclosure, ...rest } = props
  const {
    field,
    formState: { isSubmitting, defaultValues },
  } = useController({
    name,
    control,
  })
  const { resetField, setValue } = useFormContext()
  const initialValue = get(defaultValues, name)
  const handleFieldChange = useCallback(
    (e: any) => {
      if (e.target.value === '') {
        if (!isNil(initialValue)) {
          setValue(field.name, '')
        } else {
          resetField(field.name)
        }
        return
      }
      field.onChange(e)
    },
    [field, initialValue, resetField, setValue]
  )
  return (
    <FormControl
      name={name}
      control={control}
      {...rest}
    >
      <Textarea
        {...field}
        onChange={handleFieldChange}
        value={field.value ?? ''}
        id={name}
        isDisabled={isSubmitting}
        {...textareaProps}
      />
    </FormControl>
  )
}

TextareaControl.displayName = 'TextareaControl'

export default TextareaControl
