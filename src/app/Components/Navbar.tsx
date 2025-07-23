import { appleImg, bagImg, searchImg } from "@/utils/page";
import Image from "next/image";
import { navLists } from "@/constants/page";

const Navbar = () => {
    return (
        <div className="w-full py-5 px-4 sm:px-9 text-sm xl:px-0">
            <nav className="w-full text-sm flex items-center justify-between lg:max-w-[1120px] mx-auto">

                {/* Apple Logo */}
                <div>
                    <Image src={appleImg} width={50} height={50} alt="appleLogo" className="size-5" />
                </div>

                {/* Navbar Items */}
                <div className="hidden sm:inline-flex sm:gap-10 text-gray hover:text-white transition-all">
                    {navLists.map((navItem) => (
                        <span key={navItem}>
                            {navItem}
                        </span>
                    ))}
                </div>

                {/* Rightmost Logos */}
                <div className="flex items-baseline gap-6">
                    <Image src={searchImg} width={50} height={50} alt="appleLogo" className="size-[18px]" />
                    <Image src={bagImg} width={50} height={50} alt="appleLogo" className="size-5" />
                </div>

            </nav>
        </div>
    )
}

export default Navbar
