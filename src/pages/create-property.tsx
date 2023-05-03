import { useState } from 'react'
import { useGetIdentity } from '@pankod/refine-core'
import { FieldValues, useForm } from '@pankod/refine-react-hook-form'
import { useNavigate } from '@pankod/refine-react-router-v6'
import Form from 'components/common/Form'
import { PropertyImageProps } from 'interfaces/properties'

export const CreateProperty = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState<PropertyImageProps>({ name: '', url: '' })
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const fileReader = new FileReader();
    const reader = new Promise<string>(resolve => {
      fileReader.readAsDataURL(file)
      fileReader.onload = () => resolve(fileReader.result as string);
    })
    reader
      .then(url => {
        setPropertyImage({
          name: file?.name,
          url
        })
      })

  }

  const onFinishHandler = async(data:FieldValues) => {
    if(!propertyImage.name) alert("Please, load an image")

     await onFinish({
      ...data,
      photo:propertyImage.url,
      email:user.email
     })
   }

  return (
    <Form
      type='Create'
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  )
}
