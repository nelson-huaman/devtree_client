import type { ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ProfileForm, User } from "../types"
import { updateProfile, uploadImge } from "../api/DevTreeAPI"
import { toast } from "react-toastify"

export default function ProfileView() {

   const queryClient = useQueryClient()
   const data: User = queryClient.getQueryData(['user'])!

   const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
      defaultValues: {
         handle: data.handle,
         description: data.description
      }
   })
   const updateProfileMutation = useMutation({
      mutationFn: updateProfile,
      onError: (error) => {
         toast.error(error.message)
      },
      onSuccess: (data) => {
         toast.success(data)
         queryClient.invalidateQueries({ queryKey: ['user'] })
      }
   })

   const uploadImageMutation = useMutation({
      mutationFn: uploadImge,
      onError: (error) => {
         toast.error(error.message)
      },
      onSuccess: (data) => {
         toast.success('Avatar actualizado')
         queryClient.setQueryData(['user'], (prevData: User) => {
            return {
               ...prevData,
               image: data
            }
         })

      }
   })

   const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         uploadImageMutation.mutate(e.target.files[0])
      }
   }

   const handleUserProfileForm = (formData: ProfileForm) => {
      const user: User = queryClient.getQueryData(['user'])!
      user.description = formData.description
      user.handle = formData.handle
      updateProfileMutation.mutate(user)
   }


   return (
      <form
         className="bg-white p-10 rounded-lg space-y-5"
         onSubmit={handleSubmit(handleUserProfileForm)}
      >
         <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
         <div className="grid grid-cols-1 gap-2">
            <label
               htmlFor="handle"
            >Handle:</label>
            <input
               type="text"
               className="border-none bg-slate-200 rounded-lg p-2"
               placeholder="handle o Nombre de Usuario"
               {...register('handle', {
                  required: 'El handle es obligatorio'
               })}
            />
            {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
         </div>

         <div className="grid grid-cols-1 gap-2">
            <label
               htmlFor="description"
            >Descripción:</label>
            <textarea
               className="border-none bg-slate-200 rounded-lg p-2"
               placeholder="Tu Descripción"
               {...register('description', {
                  required: 'Descripción obligatoria'
               })}
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
         </div>

         <div className="grid grid-cols-1 gap-2">
            <label
               htmlFor="handle"
            >Imagen:</label>
            <input
               id="image"
               type="file"
               name="handle"
               className="border-none bg-slate-200 rounded-lg p-2"
               accept="image/*"
               onChange={handleChange}
            />
         </div>

         <input
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white p-2 text-lg w-full uppercase rounded-lg font-bold cursor-pointer"
            value='Guardar Cambios'
         />
      </form>
   )
}