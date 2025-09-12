import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkNavProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const LinkNav = ({ icon, title, href }: LinkNavProps) => {
  const pathname = usePathname();
  const isActive =
    href === "" ? true : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`link duration-300 flex text-sm py-2 px-2 rounded-lg relative font-medium items-center group gap-2 ${
        isActive
          ? "dark:text-colorTitle"
          : "text-colorTitle dark:text-colorMuted dark:hover:text-colorTitle"
      }`}
    >
      <div
        className={`icon duration-300 ${
          isActive
            ? "text-primaryColor"
            : "text-colorTitle dark:text-colorMuted dark:group-hover:text-colorTitle"
        }`}
      >
        {icon}
      </div>
      <span className="title">{title}</span>
      <div className={`absolute w-[6px] h-full bg-primaryColor -left-[12px] rounded-tr-[6px] rounded-br-[6px] ${
          isActive
            ? "block"
            : "hidden"
        }`}></div>
    </Link>
  );
};

export default LinkNav;
