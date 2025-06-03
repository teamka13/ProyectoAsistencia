import {
  Inter,
  Roboto,
  Poppins,
  Montserrat,
  Open_Sans,
  Oswald,
  Lato,
  Source_Sans_3,
  Lusitana,
} from "next/font/google";

// Configuración individual para cada fuente
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold
  display: "swap",
});

export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "700"], // Solo Regular
  display: "swap",
});

export const lusitana = Lusitana({
  subsets: ["latin"],
  variable: "--font-lusitana",
  weight: ["400", "700"], // Solo Regular
  display: "swap",
});

export const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source_sans_3",
  weight: ["400", "600", "900"], // Regular y SemiBold
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "700", "900"], // Medium y Bold
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500"], // Regular y Medium
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700"], // SemiBold y Bold
  display: "swap",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600", "800"], // Regular y SemiBold
  display: "swap",
});

// Objeto con todas las clases para uso rápido
export const fontClasses = {
  inter: inter.variable,
  roboto: roboto.variable,
  poppins: poppins.variable,
  openSans: openSans.variable,
};
