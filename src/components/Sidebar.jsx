import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
        className="my-8 flex flex-row items-center justify-start text-sm font-medium text-gray-400 hover:text-cyan-400"
      >
        <item.icon className="mr-2 h-6 w-6" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Bar */}
      <div className="hidden w-[240px] flex-col bg-[#191624] py-10 px-4 md:flex">
        <img src={logo} alt="logo" className="h-14 w-full object-contain" />
        <NavLinks />
      </div>

      {/* Mobile Bar */}
      <div className="absolute top-6 right-3 block cursor-pointer md:hidden">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="mr-2 h-6 w-6 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="mr-2 h-6 w-6 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`smooth-transition absolute top-0 z-10 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] p-6 backdrop-blur-lg md:hidden ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img src={logo} alt="logo" className="h-14 w-full object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};
export default Sidebar;
