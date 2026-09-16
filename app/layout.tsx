import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"IONIS · ICARUS | Porto Space Team",description:"Free ionospheric data exploration for the ICARUS project by Porto Space Team. Explore plasma density, select regions and download open demonstration data.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
