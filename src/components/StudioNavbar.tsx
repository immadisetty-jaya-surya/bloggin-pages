import Link from "next/link";
import { IoReturnDownBack } from "react-icons/io5";
import Logo from "./Logo";

const StudioNavbar = (props: any) => {
  return <div>
    {props.renderDefault(props)}
    <div className="p-5 bg-black text-gray-200 flex items-center justify-between">
        <Link href={'/'} className="flex gap-7 items-center font-semibold hover:text-gray-500 duration-200">
            <IoReturnDownBack className="text-xl" />Go to Website
        </Link>
        <Logo title="js-blogs-studio" className="hidden md:inline-flex text-xl" />
        <p className="text-sm">Blog content Studio Management</p>
    </div>
  </div>
}

export default StudioNavbar