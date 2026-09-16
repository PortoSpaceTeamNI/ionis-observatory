import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"IONIS — Ionosphere Observatory",description:"Explore the ionosphere in three dimensions. A CubeSat mission frontend for open plasma-density research.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
