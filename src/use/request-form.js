import { useField, useForm } from 'vee-validate';
import * as yup from 'yup'

export function useRequestForm(fn) { // fn - параметр, который я передам в компоненте RequestModal, и пойдет он в параметр handleSubmit. Сделал так, чтобы можно было submit формы в RequestModal вынести в отдельный метод и добавить в него emit created, который в компоненте home будет передавать modal значение false и закрывать модалку после создания заявки.
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField(
    'fio',
    yup.string()
      .trim()
      .required('Введите ФИО клиента')
  )
  const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
    'phone',
    yup.string()
      .trim()
      .required('Телефон не может быть пустым')
  )
  const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
    'amount',
    yup.number()
      .required('Введите сумму')
      .min(0, 'Сумма не может быть меньше 0')
  )
  const {value: status} = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    status,
    isSubmitting,
    onSubmit,
    amount,
    phone,
    fio,
    fError,
    fBlur,
    pError,
    aError,
    pBlur,
    aBlur
  }
}