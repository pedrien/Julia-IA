import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkNavProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const LinkNav = ({ icon, title, href }: LinkNavProps) => {
  const pathname = usePathname();
  const isActive = href === "" ? true : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`link flex text-sm py-2 px-2 rounded-lg font-medium items-center gap-2 ${isActive ? "bg-lightPrimaryColor hover:bg-lightPrimaryColor text-primaryColor" : "text-colorTitle"} hover:bg-bgGray`}
    >
      {icon}
      <span className="title">{title}</span>
    </Link>
  );
};

export default LinkNav;
