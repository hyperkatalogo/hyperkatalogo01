import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { MousePointerClick, Shirt, Truck, Check, Zap, ChevronLeft, ChevronRight } from "lucide-react";
function Vitrine() {
  const menuRef = useRef(null);
  const selecoesRef = useRef(null);
  const [showMenuLeft, setShowMenuLeft] = useState(false);
  const [showMenuRight, setShowMenuRight] = useState(true);
  const [showSelLeft, setShowSelLeft] = useState(false);
  const [showSelRight, setShowSelRight] = useState(true);
  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      });
    }
  };
  const updateMenuArrows = () => {
    if (menuRef.current) {
      const {
        scrollLeft,
        scrollWidth,
        clientWidth
      } = menuRef.current;
      setShowMenuLeft(scrollLeft > 2);
      setShowMenuRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };
  const updateSelArrows = () => {
    if (selecoesRef.current) {
      const {
        scrollLeft,
        scrollWidth,
        clientWidth
      } = selecoesRef.current;
      setShowSelLeft(scrollLeft > 2);
      setShowSelRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };
  useEffect(() => {
    updateMenuArrows();
    updateSelArrows();
    const handleResize = () => {
      updateMenuArrows();
      updateSelArrows();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const categorias = [{
    id: 1,
    titulo: "KIT DE\nABRIGO",
    img: "/kit-de-abrigo.png",
    link: "https://photos.app.goo.gl/AcVbrSbL4imDJSgD8"
  }, {
    id: 2,
    titulo: "KIT\nINFANTIL",
    img: "/kit-infantil.png",
    link: "https://photos.app.goo.gl/68EPCNHGSeDPPsv97"
  }, {
    id: 3,
    titulo: "KIT DE\nTREINO",
    img: "/kit-de-treino.png",
    link: "https://photos.app.goo.gl/qyoKSK9B4Z5aWB5K8"
  }, {
    id: 4,
    titulo: "VERSÃO\nJOGADOR",
    img: "/modelo-jogador.png",
    link: "https://photos.app.goo.gl/ixfk8k5dbZWdudzKA"
  }, {
    id: 5,
    titulo: "MODELO\nFEMININO",
    img: "/modelo-feminino.png",
    link: "https://photos.app.goo.gl/2fuyRew8Yaqp5ZCn7"
  }, {
    id: 6,
    titulo: "MANGA\nLONGA",
    img: "/manga-longa.png",
    link: "https://photos.app.goo.gl/jWiGyHsfcfosweQ8A"
  }];
  const selecoesItems = [{
    id: 1,
    img: "/ALEMANHA.png",
    name: "ALEMANHA",
    link: "https://photos.app.goo.gl/iU92iRfttVxHjzV67"
  }, {
    id: 2,
    img: "/ARABIA.png",
    name: "ARÁBIA S.",
    link: "https://photos.app.goo.gl/UCfdhPH5APQHeQQu6"
  }, {
    id: 3,
    img: "/ARGELIA.png",
    name: "ARGÉLIA",
    link: "https://photos.app.goo.gl/5s2QC8ZezgeiKfgo9"
  }, {
    id: 4,
    img: "/ARGENTINA.png",
    name: "ARGENTINA",
    link: "https://photos.app.goo.gl/eAmjsAuosWDhkDHd8"
  }, {
    id: 5,
    img: "/AUSTRALIA.png",
    name: "AUSTRÁLIA",
    link: "https://photos.app.goo.gl/8PctJ9u4NJMdkeq37"
  }, {
    id: 6,
    img: "/AUSTRIA.png",
    name: "ÁUSTRIA",
    link: "https://photos.app.goo.gl/wZdXYHEyn1KcNMK3A"
  }, {
    id: 7,
    img: "/BELGICA.png",
    name: "BÉLGICA",
    link: "https://photos.app.goo.gl/jMcYp2L9gxrCYWQM6"
  }, {
    id: 8,
    img: "/BOLIVIA.png",
    name: "BOLÍVIA",
    link: "https://photos.app.goo.gl/b2phKyfQzCEy6DDf8"
  }, {
    id: 9,
    img: "/BRASIL.png",
    name: "BRASIL",
    link: "https://photos.app.goo.gl/caB7TJKQgLvpZLwk6"
  }, {
    id: 10,
    img: "/BURKINA-FASO.png",
    name: "BURKINA\nFASO",
    link: "https://photos.app.goo.gl/h9Kkgmt5BC8mUco27"
  }, {
    id: 11,
    img: "/CAMAROES.png",
    name: "CAMARÕES",
    link: "https://photos.app.goo.gl/vv4juW4J5q8MG6RV7"
  }, {
    id: 12,
    img: "/CANADA.png",
    name: "CANADÁ",
    link: "https://photos.app.goo.gl/uEWm3pgSkzuqtacK9"
  }, {
    id: 13,
    img: "/CATAR.png",
    name: "CATAR",
    link: "https://photos.app.goo.gl/Cqeo8ecH2wjXtJKCA"
  }, {
    id: 14,
    img: "/CHILE.png",
    name: "CHILE",
    link: "https://photos.app.goo.gl/aaJFm83DEdtXK7hs7"
  }, {
    id: 15,
    img: "/COLOMBIA.png",
    name: "COLÔMBIA",
    link: "https://photos.app.goo.gl/uPztD5iwwAWKEBFy6"
  }, {
    id: 16,
    img: "/COREIA.png",
    name: "CORÉIA",
    link: "https://photos.app.goo.gl/Ea6v5JcUFt8xoaWE9"
  }, {
    id: 17,
    img: "/COSTA-DO-MARFIM.png",
    name: "COSTA DO\nMARFIM",
    link: "https://photos.app.goo.gl/TpRSsg8JMKLToPip8"
  }, {
    id: 18,
    img: "/COSTA-RICA.png",
    name: "COSTA RICA",
    link: "https://photos.app.goo.gl/kwLuDebd3WPet8XA9"
  }, {
    id: 19,
    img: "/CROACIA.png",
    name: "CROÁCIA",
    link: "https://photos.app.goo.gl/cvUMVN31mJ2GQ7d69"
  }, {
    id: 20,
    img: "/DINAMARCA.png",
    name: "DINAMARCA",
    link: "https://photos.app.goo.gl/DsAgEcggfDEd2mTt6"
  }, {
    id: 21,
    img: "/EGITO.png",
    name: "EGITO",
    link: "https://photos.app.goo.gl/GGZKhJG6vesJBdhg9"
  }, {
    id: 22,
    img: "/EL-SALVADOR.png",
    name: "EL SALVADOR",
    link: "https://photos.app.goo.gl/UUg35ZUe8rLeabbCA"
  }, {
    id: 23,
    img: "/EQUADOR.png",
    name: "EQUADOR",
    link: "https://photos.app.goo.gl/S5Nbtv92dmEXK9ZL8"
  }, {
    id: 24,
    img: "/ESCOCIA.png",
    name: "ESCÓCIA",
    link: "https://photos.app.goo.gl/weDGJ4LtMrmC4EFBA"
  }, {
    id: 25,
    img: "/espanha.png",
    name: "ESPANHA",
    link: "https://photos.app.goo.gl/vZjX6KtWDF4Lr4yP8"
  }, {
    id: 26,
    img: "/USA.png",
    name: "EUA",
    link: "https://photos.app.goo.gl/r3j6fkkfFNBzGr7UA"
  }, {
    id: 27,
    img: "/FRANÇA.png",
    name: "FRANÇA",
    link: "https://photos.app.goo.gl/LxP2avYb8EEvxevWA"
  }, {
    id: 28,
    img: "/GALES.png",
    name: "GALES",
    link: "https://photos.app.goo.gl/ZyXceLyCE4DQztC26"
  }, {
    id: 29,
    img: "/GANA.png",
    name: "GANA",
    link: "https://photos.app.goo.gl/T6qZr9fygzPXDWwo7"
  }, {
    id: 30,
    img: "/GUATEMALA.png",
    name: "GUATEMALA",
    link: "https://photos.app.goo.gl/o5Q5EcAcn91Hn7L7A"
  }, {
    id: 31,
    img: "/HOLANDA.png",
    name: "HOLANDA",
    link: "https://photos.app.goo.gl/jPe1UkBAArPJdTHK8"
  }, {
    id: 32,
    img: "/HONDURAS.png",
    name: "HONDURAS",
    link: "https://photos.app.goo.gl/aNDPtRiBjY4gXcLP9"
  }, {
    id: 33,
    img: "/HUNGRIA.png",
    name: "HUNGRIA",
    link: "https://photos.app.goo.gl/jkziQ5ke6rhYYFwQ8"
  }, {
    id: 34,
    img: "/inglaterra.png",
    name: "INGLATERRA",
    link: "https://photos.app.goo.gl/5ACbDwoS4tEiZPSa6"
  }, {
    id: 35,
    img: "/IRLANDA.png",
    name: "IRLANDA",
    link: "https://photos.app.goo.gl/zZbCuRrpUAJQLo4K9"
  }, {
    id: 36,
    img: "/ISLANDIA.png",
    name: "ISLÂNDIA",
    link: "https://photos.app.goo.gl/zSdPuFwQPYkn2PNR6"
  }, {
    id: 37,
    img: "/ISRAEL.png",
    name: "ISRAEL",
    link: "https://photos.app.goo.gl/crmyrK9C4P824HX36"
  }, {
    id: 38,
    img: "/italia.png",
    name: "ITÁLIA",
    link: "https://photos.app.goo.gl/ES5kUGDfk29D2iWm7"
  }, {
    id: 39,
    img: "/JAMAICA.png",
    name: "JAMAICA",
    link: "https://photos.app.goo.gl/vpgwpEhGAoqjWpNN6"
  }, {
    id: 40,
    img: "/JAPAO.png",
    name: "JAPÃO",
    link: "https://photos.app.goo.gl/2AjcmpuiQP5k9MCw5"
  }, {
    id: 41,
    img: "/MALI.png",
    name: "MALI",
    link: "https://photos.app.goo.gl/LmuHW5tq3imrQMPn6"
  }, {
    id: 42,
    img: "/MARROCOS.png",
    name: "MARROCOS",
    link: "https://photos.app.goo.gl/9Tv8RAy24FFwxHpG7"
  }, {
    id: 43,
    img: "/MEXICO.png",
    name: "MÉXICO",
    link: "https://photos.app.goo.gl/hddwr1amtDuoAiF76"
  }, {
    id: 44,
    img: "/NIGERIA.png",
    name: "NIGÉRIA",
    link: "https://photos.app.goo.gl/Fgw2Ff6XFTXAQH2j6"
  }, {
    id: 45,
    img: "/PARAGUAI.png",
    name: "PARAGUAI",
    link: "https://photos.app.goo.gl/Q8QZYJunLRd3eJma6"
  }, {
    id: 46,
    img: "/PERU.png",
    name: "PERU",
    link: "https://photos.app.goo.gl/qyNY5YjWgXMiSyhr8"
  }, {
    id: 47,
    img: "/POLONIA.png",
    name: "POLÔNIA",
    link: "https://photos.app.goo.gl/KPVSHwS1CCReQjrs5"
  }, {
    id: 48,
    img: "/portugal.png",
    name: "PORTUGAL",
    link: "https://photos.app.goo.gl/6nkjpM6pMWgsgnQY6"
  }, {
    id: 49,
    img: "/REPUBLICA-TCHECA.png",
    name: "REPÚBLICA\nT.",
    link: "https://photos.app.goo.gl/hTPMwB6FZiS9XTJR8"
  }, {
    id: 50,
    img: "/ROMENIA.png",
    name: "ROMÊNIA",
    link: "https://photos.app.goo.gl/3khrVopsB5hUvzDT8"
  }, {
    id: 51,
    img: "/SENEGAL.png",
    name: "SENEGAL",
    link: "https://photos.app.goo.gl/NT49ebZwkDxnkk6P6"
  }, {
    id: 52,
    img: "/SERVIA.png",
    name: "SÉRVIA",
    link: "https://photos.app.goo.gl/STchj4C6vG4DEpZy7"
  }, {
    id: 53,
    img: "/SUECIA.png",
    name: "SUÉCIA",
    link: "https://photos.app.goo.gl/9HZsDsc1HzM9z1AZ8"
  }, {
    id: 54,
    img: "/SUICA.png",
    name: "SUÍÇA",
    link: "https://photos.app.goo.gl/vWMFqYnWmAdvJmRg8"
  }, {
    id: 55,
    img: "/TURQUIA.png",
    name: "TURQUIA",
    link: "https://photos.app.goo.gl/BnJ86rgQqd6EJW4J7"
  }, {
    id: 56,
    img: "/URUGUAI.png",
    name: "URUGUAI",
    link: "https://photos.app.goo.gl/M35zXFDmM6drbnb8A"
  }, {
    id: 57,
    img: "/VENEZUELA.png",
    name: "VENEZUELA",
    link: "https://photos.app.goo.gl/VFmSGpo4tL22bbP97"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen w-full bg-[#050505] text-white font-sans relative overflow-x-hidden antialiased selection:bg-[#007AFF]/30", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 -z-10 bg-[#007AFF]/15 blur-[120px] w-full max-w-lg h-80 rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm mx-auto flex flex-col items-center pt-6 px-4 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 mt-2 shadow-sm", children: [
        /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
          /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-500" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-gray-300", children: "ONLINE" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-6 mb-3", children: "Catálogo Oficial" }),
      /* @__PURE__ */ jsx("div", { className: "w-28 h-28 rounded-full border-2 border-[#007AFF] bg-black p-1 flex items-center justify-center shadow-[0_0_25px_rgba(0,122,255,0.45)] transition-transform duration-300 hover:scale-105 overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "/logo.jpg", alt: "dg e th", className: "w-full h-full object-contain rounded-full scale-110", onError: (e) => {
        e.currentTarget.style.display = "none";
        const parent = e.currentTarget.parentElement;
        if (parent) fallbackLetra(parent);
      } }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black tracking-tight text-white uppercase mt-4 mb-1", children: "HYPERKATÁLOGO" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mt-6 mb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsx(MousePointerClick, { className: "w-3 h-3 text-[#007AFF]" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]", children: "CLIQUE PARA INTERAGIR COM A PÁGINA" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-xs font-black tracking-widest text-white uppercase mb-4 leading-[1.3]", children: "FALE CONOSCO:" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsx("a", { href: "https://instagram.com/hyperkatalogo", target: "_blank", rel: "noopener noreferrer", className: "w-12 h-12 rounded-full border border-[#007AFF]/30 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:bg-[#007AFF] hover:scale-110 group shadow-sm hover:shadow-[0_0_15px_rgba(0,122,255,0.4)]", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" }) }) }),
        /* @__PURE__ */ jsx("a", { href: "https://wa.me/556793053894", target: "_blank", rel: "noopener noreferrer", className: "w-12 h-12 rounded-full border border-[#007AFF]/30 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:bg-[#007AFF] hover:scale-110 group shadow-sm hover:shadow-[0_0_15px_rgba(0,122,255,0.4)]", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white opacity-50 cursor-not-allowed shadow-sm", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-[1px] bg-[#007AFF]/40 mb-10" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-3.5 px-2", children: [
        /* @__PURE__ */ jsxs("button", { className: "w-full h-14 bg-[#007AFF] text-white font-bold rounded-full flex items-center justify-center gap-3 shadow-[0_4px_20px_0_rgba(0,122,255,0.4)] transition-all hover:bg-[#0066D6] hover:scale-[1.02] active:scale-[0.98] leading-[1.3]", children: [
          /* @__PURE__ */ jsx(Shirt, { className: "w-5 h-5" }),
          " Clique aqui e veja a tabela de medidas"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "w-full h-14 bg-white/5 backdrop-blur-md border-2 border-[#007AFF]/40 text-white font-bold rounded-full flex items-center justify-center gap-3 transition-all hover:bg-white/10 hover:border-[#007AFF] hover:scale-[1.02] active:scale-[0.98] leading-[1.3]", children: [
          /* @__PURE__ */ jsx(Truck, { className: "w-5 h-5 text-[#007AFF]" }),
          " Rastreie o seu pedido clicando aqui"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-2 gap-y-3 gap-x-2 mt-10 px-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-start bg-white/[0.02] p-2 rounded-lg border border-white/5 leading-[1.3]", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-[#007AFF]" }),
          /* @__PURE__ */ jsx("span", { children: "Envio Nacional" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-start bg-white/[0.02] p-2 rounded-lg border border-white/5 leading-[1.3]", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-[#007AFF]" }),
          /* @__PURE__ */ jsx("span", { children: "Pronta Entrega" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-start bg-white/[0.02] p-2 rounded-lg border border-white/5 leading-[1.3]", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-[#007AFF]" }),
          /* @__PURE__ */ jsx("span", { children: "Qualidade Premium" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-start bg-white/[0.02] p-2 rounded-lg border border-white/5 leading-[1.3]", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-3.5 h-3.5 text-[#007AFF]" }),
          /* @__PURE__ */ jsx("span", { children: "Frete Expresso" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full mt-12 mb-4 px-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-black tracking-widest text-white uppercase leading-[1.3]", children: "MENU RÁPIDO:" }),
          /* @__PURE__ */ jsx("div", { className: "h-[1px] flex-grow bg-gradient-to-r from-[#007AFF]/40 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center w-full", children: [
          showMenuLeft && /* @__PURE__ */ jsx("button", { onClick: () => scroll(menuRef, "left"), className: "absolute -left-2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/10 text-white backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:bg-[#007AFF] hover:border-[#007AFF] transition-all focus:outline-none", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("div", { ref: menuRef, onScroll: updateMenuArrows, className: "flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory px-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: categorias.map((cat) => /* @__PURE__ */ jsxs("a", { href: cat.link, target: "_blank", rel: "noopener noreferrer", className: "flex flex-col items-center gap-2.5 min-w-[80px] snap-center group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full border-2 border-[#007AFF] bg-[#151515] flex items-center justify-center shadow-[0_4px_15px_rgba(0,122,255,0.2)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(0,122,255,0.4)] overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: cat.img, alt: cat.titulo.replace("\n", " "), className: "w-full h-full object-cover rounded-full scale-125 origin-center", onError: (e) => {
              e.currentTarget.style.display = "none";
            } }) }),
            /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase text-center leading-tight whitespace-pre-line text-gray-400 group-hover:text-white transition-colors leading-[1.3]", children: cat.titulo })
          ] }, cat.id)) }),
          showMenuRight && /* @__PURE__ */ jsx("button", { onClick: () => scroll(menuRef, "right"), className: "absolute -right-2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/10 text-white backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:bg-[#007AFF] hover:border-[#007AFF] transition-all focus:outline-none", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full mt-4 mb-4 px-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-black tracking-widest text-white uppercase leading-[1.3]", children: "SELEÇÕES:" }),
          /* @__PURE__ */ jsx("div", { className: "h-[1px] flex-grow bg-gradient-to-r from-[#007AFF]/40 to-transparent" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full border border-white/10 bg-black/50 rounded-xl flex items-center justify-center mb-6 shadow-sm overflow-hidden hover:border-[#007AFF]/50 transition-colors cursor-pointer", children: /* @__PURE__ */ jsx("img", { src: "/fifa.png", alt: "FIFA Banner", className: "w-full h-auto object-contain" }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center w-full", children: [
          showSelLeft && /* @__PURE__ */ jsx("button", { onClick: () => scroll(selecoesRef, "left"), className: "absolute -left-2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/10 text-white backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:bg-[#007AFF] hover:border-[#007AFF] transition-all focus:outline-none", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("div", { ref: selecoesRef, onScroll: updateSelArrows, className: "flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory px-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: selecoesItems.map((item) => /* @__PURE__ */ jsxs("a", { href: item.link, target: "_blank", rel: "noopener noreferrer", className: "flex flex-col items-center gap-2.5 min-w-[80px] snap-center group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full border-2 border-[#007AFF] bg-[#151515] flex items-center justify-center shadow-[0_4px_15px_rgba(0,122,255,0.2)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(0,122,255,0.4)] overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: item.img, alt: "", className: "w-full h-full object-contain p-2.5 drop-shadow-md group-hover:scale-110 transition-transform duration-300", onError: (e) => {
              e.currentTarget.style.display = "none";
            } }) }),
            /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase text-center leading-tight whitespace-pre-line text-gray-400 group-hover:text-white transition-colors leading-[1.3]", children: item.name })
          ] }, item.id)) }),
          showSelRight && /* @__PURE__ */ jsx("button", { onClick: () => scroll(selecoesRef, "right"), className: "absolute -right-2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/10 text-white backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:bg-[#007AFF] hover:border-[#007AFF] transition-all focus:outline-none", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("a", { href: "https://wa.me/556793053894", target: "_blank", rel: "noopener noreferrer", className: "fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-7 h-7", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" }) }) })
  ] });
}
function fallbackLetra(parent) {
  const fallback = document.createElement("span");
  fallback.className = "text-lg font-black text-[#007AFF]";
  fallback.innerText = "dg e th";
  parent.appendChild(fallback);
}
export {
  Vitrine as component
};
