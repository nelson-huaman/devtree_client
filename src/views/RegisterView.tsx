import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import type { RegisterForm } from "../types";
import { isAxiosError } from "axios";
import api from "../config/axios";
import { toast } from "react-toastify";

export default function RegisterView() {

   const location  = useLocation()
   const navigate = useNavigate()

   const initialValues: RegisterForm = {
      name: "",
      email: "",
      handle: location?.state?.handle || '',
      password: "",
      password_confirmation: ""
   }

   const { register, watch, handleSubmit, reset, formState: { errors } } = useForm({
      defaultValues: initialValues,
      mode: 'onTouched'
   });

   const password = watch("password");

   const handleRegister = async (formData: RegisterForm) => {
      try {
         const url = `/auth/register`;
         const { data } = await api.post<string>(url, formData)
         toast.success(data)

         reset()
         navigate('/auth/login')
         
      } catch (error) {
         if (isAxiosError(error) && error.response) {
            toast.error(error.response.data.error)
         }
      }
   }

   return (
      <>
         <h1 className="text-4xl text-white font-bold text-center">Crear Cuenta</h1>

         <form
            onSubmit={handleSubmit(handleRegister)}
            className="bg-white p-6 rounded-lg space-y-5 mt-10"
         >
            <div className="grid grid-cols-1 space-y-1">
               <label htmlFor="name" className="text-lg text-slate-500">Nombre</label>
               <input
                  id="name"
                  type="text"
                  placeholder="Tu Nombre"
                  className="bg-slate-200 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("name", {
                     required: "El nombre es obligatorio"
                  })}
               />
               {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-1">
               <label htmlFor="email" className="text-lg text-slate-500">E-mail</label>
               <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="bg-slate-200 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("email", {
                     required: "El email es obligatorio",
                     pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "El email no es válido"
                     }
                  })}
               />
               {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-1">
               <label htmlFor="handle" className="text-lg text-slate-500">Handle</label>
               <input
                  id="handle"
                  type="text"
                  placeholder="Nombre de usuario: sin espacios"
                  className="bg-slate-200 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("handle", {
                     required: "El handle es obligatorio"
                  })}
               />
               {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-1">
               <label htmlFor="password" className="text-lg text-slate-500">Password</label>
               <input
                  id="password"
                  type="password"
                  placeholder="Password de Registro"
                  className="bg-slate-200 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("password", {
                     required: "El password es obligatorio",
                     minLength: {
                        value: 8,
                        message: "El password debe ser minimo 8 caracteres"
                     }
                  })}
               />
               {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 space-y-1">
               <label htmlFor="password_confirmation" className="text-lg text-slate-500">Repetir Password</label>
               <input
                  id="password_confirmation"
                  type="password"
                  placeholder="Repetir Password"
                  className="bg-slate-200 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("password_confirmation", {
                     required: "Repetir password es obligatoria",
                     validate: value => value === password || "Los passwords no son iguales"
                  })}
               />
               {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
            </div>

            <input
               type="submit"
               className="bg-cyan-400 hover:bg-cyan-500 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
               value='Crear Cuenta'
            />
         </form>

         <nav className="mt-10">
            <Link
               to="/auth/login"
               className="text-center text-white text-lg block"
            >
               ¿Ya tienes una cuenta? <span className="font-bold">Inicia sesión?</span>
            </Link>
         </nav>
      </>
   )
}

