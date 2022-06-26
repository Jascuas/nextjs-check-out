

import Link from "next/link";
import Image from "next/image";

import logo from "../../../assets/logo.jpg"
import { ActiveLink } from "@components/common";

export default function Navbar() {
  return (
    <section className="shadow-lg">
      <div className="relative p-2 sm:p-4 lg:p-6">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col sm:flex-row items-center">
            <Link href="/">
              <a>
                <Image
                  className="rounded-md"
                  layout="fixed"
                  width="70%"
                  height="70%"
                  src={logo}
                  alt="logo" />
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </section>
  )
}