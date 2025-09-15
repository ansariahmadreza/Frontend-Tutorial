"use client"
import Link from "next/link"
import { redirect, usePathname, useRouter } from "next/navigation"
import Container from "./Container"
import { useShoppingCartContext } from "@/Context/ShoppingCartContext"
import cookies from "js-cookie"

const Nav = () => {

    const pathname = usePathname()
    const { cartTotalQty } = useShoppingCartContext()
    const Router = useRouter()

    const Navlinks = [
        { href: "/", title: "Home" },
        { href: "/store", title: "store" },
        { href: "/dashboard", title: "dashboard" },
        { href: "/login", title: "Login" }
    ]
    return (
        <Container >
            <nav className="shadow-xl flex justify-between" >
                <ul className="flex">
                    {Navlinks.map((item) =>
                        <li key={item.href} className="px-5">
                            <Link href={item.href} className={`${pathname === item.href ? "text-red-900" : ""}`}>
                                {item.title}</Link>
                        </li>
                    )}
                </ul>
                <div>
                    <span className="bg-amber-600 rounded p-2 mr-2">{cartTotalQty}</span>
                    <Link href={"/Cart"}>Shopping Cart</Link>
                    <button onClick={() => {
                        cookies.remove("token")
                        Router.push("/")
                    }} className="px-4">Exit</button>
                </div>
            </nav>
        </Container>
    )
}

export default Nav