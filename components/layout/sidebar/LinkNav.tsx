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
      className={`link flex text-sm py-2 px-2 rounded-lg relative font-medium items-center gap-2 ${
        isActive
          ? ""
          : "text-colorTitle"
      }`}
    >
      <div
        className={`icon ${
          isActive
            ? "text-primaryColor"
            : "text-colorTitle"
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
