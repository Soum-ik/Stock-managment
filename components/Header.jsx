import Link from "next/link";
const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-4xl hidden sm:block font-extrabold">
            Stock Management System
          </span>
        </a>
        <div>
          <button className=" bg-slate-500/10 px-4 py-2 rounded-lg hover:px-[14px] ease-in-out">
            <Link href={`https://github.com/soum-ik/stock-managment`}>
              GitHub
            </Link>
          </button>
          {/* <button></button> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
