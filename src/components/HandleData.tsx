import type { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
   data: UserHandle
}

export default function HandleData({ data }: HandleDataProps) {

   const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

   return (
      <div className="space-y-6 text-white">
         <p className="text-5xl font-black text-white text-center">{data.handle}</p>

         {data.image && <img src={data.image} className="max-w-[200px] mx-auto" />}

         <p className="text-lg font-bold text-white text-center">{data.description}</p>

         <div className="mt-10 flex flex-col gap-6">
            {links.length ?
               links.map(link => (
                  <a
                     key={link.name}
                     className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                     href={link.url}
                     target="_blank"
                     rel="noreferrer noopener"
                  >
                     <img src={`/social/icon_${link.name}.svg`} alt="Imagen red social" className="w-10"/>
                     <p className="text-black capitalize text-lg">Visita mi: <span className="font-bold">{link.name}</span></p>
                  </a>
               ))
               : <p className="text-center text-white">No hay enlaces ene ste Perfil</p>}
         </div>
      </div>
   )
}
