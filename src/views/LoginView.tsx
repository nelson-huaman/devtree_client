import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function LoginView() {

   const navigate = useNavigate()

   const initialValues: LoginForm = {
      email: "",
      password: ""
   }

   const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: initialValues,
      mode: 'onTouched'
   });

   const handleLogin = async (formData: LoginForm) => {
      try {
         const url = `/auth/login`
         const { data } = await api.post<string>(url, formData)

         localStorage.setItem("AUTH_TOKEN", data)

         toast.success('Autenticación exitosa')
         navigate('/admin')

      } catch (error) {
         if (isAxiosError(error) && error.response) {
            toast.error(error.response.data.error)
         }
      }
   }

   return (
      <>
         <h1 className="text-4xl text-white font-bold text-center">Inicar Sesión</h1>

         <form
            onSubmit={handleSubmit(handleLogin)}
            className="bg-white p-6 rounded-lg space-y-5 mt-10"
            noValidate
         >
            <div className="grid grid-cols-1 space-y-1">
               <label htmlFor="email" className="text-lg text-slate-500">E-mail</label>
               <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="bg-slate-200 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("email", {
                     required: "El Email es obligatorio",
                     pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "E-mail no válido",
                     },
                  })}
               />
               {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
               )}
            </div>
            <div className="grid grid-cols-1 space-y-1">
               <label htmlFor="password" className="text-lg text-slate-500">Password</label>
               <input
                  id="password"
                  type="password"
                  placeholder="Password de Registro"
                  className="bg-slate-200 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("password", {
                     required: "El Password es obligatorio",
                  })}
               />
               {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
               )}
            </div>

            <input
               type="submit"
               className="bg-cyan-400 hover:bg-cyan-500 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
               value='Iniciar Sesión'
            />
         </form>

         <nav className="mt-10">
            <Link
               to="/auth/register"
               className="text-center text-white text-lg block"
            >
               ¿Ya tienes una cuenta? <span className="font-bold">Crea una aquí?</span>
            </Link>
         </nav>
      </>
   )
}
