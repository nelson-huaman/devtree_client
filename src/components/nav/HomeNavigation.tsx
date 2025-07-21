import { Link } from "react-router-dom";


export default function HomeNavigation() {
   return (
      <>
         <Link
            to={'/auth/login'}
            className="text-white uppercase font-bold text-sm cursor-pointer"
         >Iniciar Sesion</Link>
         <Link
            to={'/auth/register'}
            className="bg-lime-500 p-2 text-slate-800 uppercase font-bold text-sm rounded-lg cursor-pointer"
         >Registrarme</Link>
      </>
   )
}
