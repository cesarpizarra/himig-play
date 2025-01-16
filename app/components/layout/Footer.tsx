import Link from "next/link";
import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { footerSocials } from "../../constant";
const Footer = () => {
  return (
    <footer className="p-5 font-medium text-white">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-center">
          Want to contribute? Find an issue with this page?{" "}
          <Link href="#">
            <span className="cursor-pointer text-red-500 hover:underline">
              Fix it on GitHub
            </span>
          </Link>
        </h2>

        <div className="flex flex-col items-center py-4">
          <h3 className="inline-flex items-center gap-2">
            Copyright{" "}
            <span>
              <FaRegCopyright />
            </span>{" "}
            2024 <span className="text-primary">Himig Play</span>
          </h3>

          <h3 className="inline-flex items-center gap-2 py-4">
            Created with <RiNextjsFill size={25} /> by:{" "}
            <Link href="https://cpizarra.vercel.app/">
              <span className="text-secondary hover:underline">
                Cesar Pizarra
              </span>
            </Link>
          </h3>
        </div>

        <div className="flex items-center gap-4">
          {footerSocials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary"
            >
              {React.createElement(social.logo, { size: 20 })}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
