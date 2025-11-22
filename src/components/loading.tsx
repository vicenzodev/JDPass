import { BiLoaderCircle } from "react-icons/bi";

export const Loading = () =>{
    return(
        <div className="min-h-screen w-full bg-black text-white flex flex-col justify-center items-center text-3xl gap-3">
            <BiLoaderCircle className="animate-spin" size={80} />
            <p>Carregando</p>
        </div>
    );
}
