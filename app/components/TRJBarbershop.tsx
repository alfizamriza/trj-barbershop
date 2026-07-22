"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { Bebas_Neue, Playfair_Display, Inter } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});
const playfair = Playfair_Display({
  style: "italic",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});
const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

type Service = {
  idx: string;
  name: string;
  price: string;
  desc: string;
};

const SERVICES: Service[] = [
  { idx: "01 / HAIRCUT", name: "TRJ Cut", price: "60K", desc: "Hair Cut, Wash, Eyegel, Vitamin, Styling." },
  { idx: "02 / HAIRCUT", name: "TRJ Gentleman", price: "80K", desc: "Hair Cut, Wash, Scrub, Styling." },
  { idx: "03 / HAIRCUT", name: "TRJ Kids", price: "50K", desc: "Hair Cut, Wash, Eyegel, Vitamin, Styling untuk si kecil." },
  { idx: "04 / TREATMENT", name: "Cooling Creambath", price: "70K", desc: "Creambath, hair mask, menthol cooling, vitamin." },
  { idx: "05 / TREATMENT", name: "Hair Calor Basic", price: "80K", desc: "Creambath, hair mask, menthol cooling, vitamin." },
  { idx: "06 / TREATMENT", name: "Hair Caloring", price: "250K–300K", desc: "Bleaching & pewarnaan rambut." },
  { idx: "07 / TREATMENT", name: "Perm Hair", price: "200K", desc: "Pengeritingan rambut, hasil natural." },
  { idx: "08 / TREATMENT", name: "Perm Hair 2", price: "350K", desc: "Perm dengan hasil & ketahanan lebih maksimal." },
  { idx: "09 / TREATMENT", name: "Smoothing", price: "250K", desc: "Meluruskan rambut agar rapi tahan lama." },
  { idx: "10 / COMBO", name: "TRJ Premium Cut", price: "125K", desc: "Hair Cut, Wash, Scrub, Mask, Ear Cleanser, Vitamin, Styling, Mecoontalling." },
  { idx: "11 / COMBO", name: "TRJ Premium Cut Super", price: "175K", desc: "Hair Cut, Wash, Scrub, Mask, Massage, Ear Cleanser, Vitamin, Eyegel, Styling, Mecoontalling." },
  { idx: "12 / ADDITIONAL", name: "Leon Cut", price: "30K", desc: "Layanan tambahan potongan Leon." },
  { idx: "13 / ADDITIONAL", name: "Leon Gentleman", price: "30K", desc: "Layanan tambahan gaya Leon Gentleman." },
  { idx: "14 / ADDITIONAL", name: "Leon Kids", price: "30K", desc: "Layanan tambahan potongan Leon untuk anak." },
];

const WA_NUMBER = "6282372808527";
const IG_HANDLE = "trj_barbershop";
const TIKTOK_HANDLE = IG_HANDLE;
const ADDRESS = "Jl. T. Hasan Dek, Simpang Jambo Tape (Beurawe), Kuta Alam, Banda Aceh";

export default function TRJBarbershop() {
  const trackRef = useRef<HTMLDivElement>(null);
  const baWrapRef = useRef<HTMLDivElement>(null);
  const baAfterRef = useRef<HTMLDivElement>(null);
  const baHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    let lenisInstance: any;
    let loadInterval: ReturnType<typeof setInterval> | undefined;

    const init = async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { default: Lenis } = await import("lenis");
      const gsap = gsapModule.gsap ?? gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const loaderBar = document.querySelector<HTMLElement>("#loader-bar span");
        const pctText = document.getElementById("pct-text");
        let pct = 0;
        loadInterval = setInterval(() => {
          pct += Math.random() * 18;
          if (pct >= 100) {
            pct = 100;
            clearInterval(loadInterval);
            gsap.to("#loader", {
              opacity: 0,
              duration: 0.7,
              delay: 0.3,
              onComplete: () => {
                const loader = document.getElementById("loader");
                if (loader) loader.style.display = "none";
              },
            });
          }
          if (loaderBar) loaderBar.style.width = pct + "%";
          if (pctText) pctText.textContent = Math.floor(pct) + "%";
        }, 220);

        const cursor = document.getElementById("cursor");
        const glow = document.getElementById("cursor-glow");
        const onMouseMove = (e: MouseEvent) => {
          if (cursor) {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
          }
          if (glow) {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
          }
        };
        const onMouseDown = () => {
          if (cursor) cursor.style.transform = "translate(-50%,-50%) scale(0.8) rotate(20deg)";
        };
        const onMouseUp = () => {
          if (cursor) cursor.style.transform = "translate(-50%,-50%) scale(1) rotate(0deg)";
        };
        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        const interactiveEls = document.querySelectorAll("a,button,input,textarea,select");
        const enter = () => {
          if (cursor) {
            cursor.style.width = "50px";
            cursor.style.height = "50px";
          }
        };
        const leave = () => {
          if (cursor) {
            cursor.style.width = "34px";
            cursor.style.height = "34px";
          }
        };
        interactiveEls.forEach((el) => {
          el.addEventListener("mouseenter", enter);
          el.addEventListener("mouseleave", leave);
        });

        try {
          lenisInstance = new Lenis({ duration: 1.1, smoothWheel: true });
          lenisInstance.on?.("scroll", ScrollTrigger.update);
          gsap.ticker.add((time: number) => {
            lenisInstance?.raf?.(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        } catch {
          console.warn("Lenis unavailable, using native scroll");
        }

        gsap.to("#progress", {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            scrub: 0.3,
            start: 0,
            end: () => document.body.scrollHeight - window.innerHeight,
          },
        });

        ScrollTrigger.create({
          start: 80,
          end: 99999,
          onUpdate: (self: { scroll: () => number }) => {
            document.getElementById("nav")?.classList.toggle("scrolled", self.scroll() > 80);
          },
        });

        gsap.to("#razor-reveal", {
          clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
          ease: "none",
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.6 },
        });

        document.querySelectorAll(".reveal-up").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        const track = trackRef.current;
        if (track) {
          const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 96);
          gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: "#services",
              start: "top top",
              end: () => "+=" + track.scrollWidth,
              scrub: 0.6,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        }

        document.querySelectorAll<HTMLElement>(".counter-num").forEach((el) => {
          const target = parseFloat(el.dataset.target || "0");
          const decimal = parseInt(el.dataset.decimal || "0", 10);
          const suffix = el.dataset.suffix || "";
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () => {
              gsap.to(
                { val: 0 },
                {
                  val: target,
                  duration: 1.8,
                  ease: "power2.out",
                  onUpdate: function (this: { targets: () => Array<{ val: number }> }) {
                    el.textContent = this.targets()[0].val.toFixed(decimal) + suffix;
                  },
                }
              );
            },
          });
        });

        window.addEventListener("load", () => ScrollTrigger.refresh());
      });
    };

    void init();

    const baWrap = baWrapRef.current;
    const baAfter = baAfterRef.current;
    const baHandle = baHandleRef.current;
    let dragging = false;

    const setBA = (px: number) => {
      if (!baWrap || !baAfter || !baHandle) return;
      const rect = baWrap.getBoundingClientRect();
      const pctX = Math.max(0, Math.min(1, px / rect.width));
      baAfter.style.clipPath = `inset(0 ${100 - pctX * 100}% 0 0)`;
      baHandle.style.left = pctX * 100 + "%";
    };
    const onHandleDown = () => (dragging = true);
    const onWinUp = () => (dragging = false);
    const onWrapMove = (e: MouseEvent) => {
      if (dragging && baWrap) {
        const rect = baWrap.getBoundingClientRect();
        setBA(e.clientX - rect.left);
      }
    };
    const onWrapClick = (e: MouseEvent) => {
      if (!baWrap) return;
      const rect = baWrap.getBoundingClientRect();
      setBA(e.clientX - rect.left);
    };
    const onWrapTouch = (e: TouchEvent) => {
      if (!baWrap) return;
      const rect = baWrap.getBoundingClientRect();
      setBA(e.touches[0].clientX - rect.left);
    };

    baHandle?.addEventListener("mousedown", onHandleDown);
    window.addEventListener("mouseup", onWinUp);
    baWrap?.addEventListener("mousemove", onWrapMove);
    baWrap?.addEventListener("click", onWrapClick);
    baWrap?.addEventListener("touchmove", onWrapTouch);

    return () => {
      clearInterval(loadInterval);
      ctx?.revert?.();
      lenisInstance?.destroy?.();
      baHandle?.removeEventListener("mousedown", onHandleDown);
      window.removeEventListener("mouseup", onWinUp);
      baWrap?.removeEventListener("mousemove", onWrapMove);
      baWrap?.removeEventListener("click", onWrapClick);
      baWrap?.removeEventListener("touchmove", onWrapTouch);
    };
  }, []);

  const handleBookingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nama = (document.getElementById("f-nama") as HTMLInputElement)?.value ?? "";
    const hp = (document.getElementById("f-hp") as HTMLInputElement)?.value ?? "";
    const tanggal = (document.getElementById("f-tanggal") as HTMLInputElement)?.value ?? "";
    const jam = (document.getElementById("f-jam") as HTMLInputElement)?.value ?? "";
    const layanan = (document.getElementById("f-layanan") as HTMLSelectElement)?.value ?? "";
    const barber = (document.getElementById("f-barber") as HTMLSelectElement)?.value ?? "";
    const catatan = (document.getElementById("f-catatan") as HTMLTextAreaElement)?.value ?? "";

    const msg =
      `Halo TRJ Barbershop.\nSaya ingin booking.\n\n` +
      `Nama: ${nama}\nNomor: ${hp}\nTanggal: ${tanggal}\nJam: ${jam}\n` +
      `Layanan: ${layanan}\nBarber: ${barber}\nCatatan: ${catatan || "-"}\n\nTerima kasih.`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className={`${bebas.variable} ${playfair.variable} ${inter.variable} trj-root`}>
      <div id="progress" />
      <div id="cursor-glow" />
      <div id="cursor">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--red-glow)" strokeWidth={1.6}>
          <circle cx="6" cy="7" r="2.4" />
          <circle cx="6" cy="17" r="2.4" />
          <line x1="20" y1="4" x2="8.5" y2="15.5" />
          <line x1="8.5" y1="8.5" x2="20" y2="20" />
        </svg>
      </div>

      <div id="loader">
        <div className="logo-mark display">TRJ</div>
        <div id="loader-bar">
          <span />
        </div>
        <div className="pct display" id="pct-text">
          0%
        </div>
      </div>

      <nav id="nav">
        <div className="logo">
          TRJ <span>BARBERSHOP</span>
        </div>
        <div className="links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#transform">Transformasi</a>
          <a href="#testi">Review</a>
        </div>
        <a href="#booking" className="cta">
          Book Now
        </a>
      </nav>

      <section id="hero">
        <div className="bg" />
        <div className="eyebrow">Premium Grooming — Aceh</div>
        <h1 className="wordmark display">
          TRJ <span className="r">BARBERSHOP</span>
        </h1>
        <div className="razor-wrap">
          <div className="razor-line" id="razor-base">
            Datang Kusam, Pulang Tampan.
            <span className="reveal" id="razor-reveal">
              Datang Kusam, Pulang Tampan.
            </span>
          </div>
        </div>
        <p className="sub">
          Bukan sekadar potong rambut — sebuah pengalaman grooming premium, dirancang untuk pria yang serius soal
          penampilannya.
        </p>
        <a href="#booking" className="cta-btn">
          <span>Book Now</span>
        </a>
        <div id="scroll-ind">
          SCROLL
          <div className="dash" />
        </div>
      </section>

      <section id="about" className="section-pad">
        <div className="about-grid">
          <div className="about-visual reveal-up">
            <svg viewBox="0 0 100 100" stroke="var(--silver)" strokeWidth={1.4} fill="none">
              <path d="M30 20 L70 80 M70 20 L30 80" stroke="var(--red)" strokeWidth={2} />
              <circle cx="30" cy="20" r="6" />
              <circle cx="30" cy="80" r="6" />
            </svg>
            <span className="frame-label">Est. Aceh</span>
          </div>
          <div className="about-copy">
            <p className="big">&ldquo;Bukan sekadar potong rambut. Kami menciptakan pengalaman.&rdquo;</p>
            <p>
              TRJ Barbershop hadir untuk pria yang memahami bahwa penampilan adalah bagian dari kepercayaan diri.
              Setiap potongan dikerjakan dengan presisi oleh barber profesional, di ruang yang dirancang senyaman
              mungkin.
            </p>
            <p>Peralatan steril, produk premium, dan suasana yang membuat Anda betah — itu standar kami di setiap kunjungan.</p>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="section-pad" style={{ paddingBottom: 0 }}>
          <div className="head">
            <span className="num">01</span>
            <h2>Experience</h2>
            <div className="line" />
          </div>
        </div>
        <div className="exp-grid">
          <div className="exp-card reveal-up">
            <div className="n">A</div>
            <h3>Barber Profesional</h3>
            <p>Tim barber berpengalaman, terlatih dalam teknik modern dan klasik.</p>
          </div>
          <div className="exp-card reveal-up">
            <div className="n">B</div>
            <h3>Peralatan Steril</h3>
            <p>Setiap alat disterilkan sebelum digunakan — kebersihan adalah prioritas.</p>
          </div>
          <div className="exp-card reveal-up">
            <div className="n">C</div>
            <h3>Produk Premium</h3>
            <p>Menggunakan produk grooming kualitas tinggi untuk hasil terbaik.</p>
          </div>
          <div className="exp-card reveal-up">
            <div className="n">D</div>
            <h3>Tempat Nyaman</h3>
            <p>Ruang tunggu dan kursi yang dirancang untuk kenyamanan maksimal.</p>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="head">
          <span className="num">02</span>
          <h2>Our Services</h2>
          <div className="line" />
        </div>
        <div className="h-track" id="h-track" ref={trackRef}>
          {SERVICES.map((s) => (
            <div className="svc-card" key={s.name}>
              <div className="idx">{s.idx}</div>
              <h3>{s.name}</h3>
              <div className="price">{s.price}</div>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="transform" className="section-pad">
        <div className="head">
          <span className="num">03</span>
          <h2>Transformasi</h2>
          <div className="line" />
        </div>
        <div className="ba-wrap" id="ba-wrap" ref={baWrapRef}>
          <div className="ba-before">
            <img src="/before.png" alt="Before styling" className="ba-image" />
            <div className="tag">Before</div>
            <h4 className="display">KUSAM</h4>
          </div>
          <div className="ba-after" ref={baAfterRef}>
            <img src="/after.png" alt="After styling" className="ba-image" />
            <div className="tag">After</div>
            <h4 className="display">TAMPAN</h4>
          </div>
          <div id="ba-handle" ref={baHandleRef} />
        </div>
        <p className="ba-caption">Geser untuk melihat perbedaannya</p>
      </section>

      <section id="counters">
        <div className="counter-grid">
          <div>
            <div className="counter-num" data-target="1000" data-suffix="+">
              0
            </div>
            <div className="counter-label">Pelanggan Puas</div>
          </div>
          <div>
            <div className="counter-num" data-target="4.9" data-decimal="1" data-suffix="★">
              0
            </div>
            <div className="counter-label">Rating Rata-rata</div>
          </div>
          <div>
            <div className="counter-num" data-target="5" data-suffix="">
              0
            </div>
            <div className="counter-label">Barber Profesional</div>
          </div>
        </div>
      </section>

      <section id="testi">
        <div className="head">
          <span className="num">04</span>
          <h2>Kata Mereka</h2>
          <div className="line" />
        </div>
        <div className="marquee" id="marquee">
          {[...Array(2)].flatMap((_, loop) =>
            [
              "Potongannya keren, sesuai request. Barbernya juga ramah banget.",
              "Tempatnya nyaman, bersih, wangi. Betah nunggu gilirannya.",
              "Recommended banget buat yang mau grooming niat, hasil rapi terus.",
              "Booking gampang lewat WA, gak perlu antri lama.",
            ].map((t, i) => (
              <div className="t-card" key={`${loop}-${i}`}>
                <div className="stars">★★★★★</div>
                <p>{t}</p>
                <div className="who">— Pelanggan TRJ</div>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="booking">
        <div className="book-wrap">
          <h2>Book Now</h2>
          <p className="sub">Isi form, langsung terhubung ke WhatsApp kami.</p>
          <form id="book-form" onSubmit={handleBookingSubmit}>
            <div className="form-row">
              <div className="field">
                <label>Nama</label>
                <input type="text" id="f-nama" required />
              </div>
              <div className="field">
                <label>No. HP / WA</label>
                <input type="tel" id="f-hp" required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Tanggal</label>
                <input type="date" id="f-tanggal" required />
              </div>
              <div className="field">
                <label>Jam</label>
                <input type="time" id="f-jam" required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Layanan</label>
                <select id="f-layanan">
                  {SERVICES.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Barber</label>
                <select id="f-barber">
                  <option>Tidak masalah</option>
                  <option>Barber A</option>
                  <option>Barber B</option>
                </select>
              </div>
            </div>
            <div className="form-row full">
              <div className="field">
                <label>Catatan (opsional)</label>
                <textarea id="f-catatan" />
              </div>
            </div>
            <button type="submit" id="book-submit">
              Book via WhatsApp
            </button>
          </form>
        </div>
      </section>

      <section id="closing">
        <h2 className="reveal-up">
          LOOK SHARP.
          <br />
          FEEL <span className="r">CONFIDENT.</span>
        </h2>
        <a href="#booking" className="cta-btn">
          <span>Book Today</span>
        </a>
      </section>

      <footer>
        <div className="logo">
          TRJ <span>BARBERSHOP</span>
        </div>
        <div className="flinks">
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={`https://www.tiktok.com/@${TIKTOK_HANDLE}`} target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </div>
        <div className="copy">
          {ADDRESS} · © 2026 TRJ Barbershop. All rights reserved.
        </div>
      </footer>

      <a id="floating-wa" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.3c-.22.62-1.28 1.18-1.77 1.24-.46.06-.96.09-1.55-.1-.36-.11-.82-.26-1.4-.51-2.47-1.07-4.08-3.58-4.2-3.75-.12-.16-1-1.33-1-2.53s.63-1.79.85-2.03c.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.22.53.74 1.83.8 1.96.06.13.1.29.02.46-.08.16-.13.26-.25.4-.13.14-.27.32-.38.43-.13.13-.26.27-.11.53.15.26.67 1.1 1.43 1.78.98.88 1.81 1.15 2.07 1.28.26.13.41.11.56-.07.16-.18.65-.76.82-1.02.17-.26.34-.22.57-.13.23.08 1.46.69 1.71.82.25.13.42.19.48.3.06.11.06.61-.16 1.23z" />
        </svg>
      </a>

      <style jsx global>{`
        :root {
          --bg: #0a0908;
          --bg-alt: #131110;
          --red: #b4152a;
          --red-glow: #ff2d42;
          --silver: #a9a9a4;
          --silver-light: #d9d8d2;
          --text: #f0eee7;
          --text-dim: #83807a;
          --line: rgba(240, 238, 231, 0.08);
          --font-display: ${bebas.style.fontFamily};
          --font-serif: ${playfair.style.fontFamily};
          --font-body: ${inter.style.fontFamily};
        }
        .trj-root * { margin: 0; padding: 0; box-sizing: border-box; }
        .trj-root { background: var(--bg); color: var(--text); font-family: var(--font-body), sans-serif; overflow-x: hidden; cursor: none; }
        .trj-root a { color: inherit; text-decoration: none; }
        .trj-root ::selection { background: var(--red); color: #fff; }
        .trj-root .display { font-family: var(--font-display), sans-serif; letter-spacing: 0.04em; }
        .trj-root .accent-serif { font-family: var(--font-serif), serif; font-style: italic; font-weight: 400; }

        #cursor { position: fixed; top: 0; left: 0; width: 34px; height: 34px; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); mix-blend-mode: difference; transition: width 0.2s, height 0.2s; }
        #cursor svg { width: 100%; height: 100%; transform-origin: center; }
        #cursor-glow { position: fixed; top: 0; left: 0; width: 420px; height: 420px; pointer-events: none; z-index: 1; background: radial-gradient(circle, rgba(180, 21, 42, 0.16), transparent 70%); transform: translate(-50%, -50%); }

        #progress { position: fixed; top: 0; left: 0; height: 2px; background: linear-gradient(90deg, var(--red), var(--red-glow)); width: 0%; z-index: 9998; }

        #loader { position: fixed; inset: 0; background: #050403; z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; }
        #loader .logo-mark { font-size: clamp(36px, 7vw, 64px); letter-spacing: 0.15em; position: relative; }
        #loader .logo-mark::after { content: ""; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.5), transparent); animation: shine 1.6s ease-in-out infinite; }
        @keyframes shine { to { left: 140%; } }
        #loader .pct { font-size: 13px; letter-spacing: 0.3em; color: var(--text-dim); }
        #loader-bar { width: 220px; height: 1px; background: var(--line); position: relative; }
        #loader-bar span { position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: var(--red); }

        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 500; display: flex; align-items: center; justify-content: space-between; padding: 22px 6vw; transition: background 0.4s, padding 0.4s, border-color 0.4s; border-bottom: 1px solid transparent; }
        nav.scrolled { background: rgba(10, 9, 8, 0.55); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); padding: 14px 6vw; border-color: var(--line); }
        nav .logo { font-family: var(--font-display); font-size: 22px; letter-spacing: 0.12em; }
        nav .logo span { color: var(--red); }
        nav .links { display: flex; gap: 36px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--silver); }
        nav .links a { position: relative; padding-bottom: 4px; }
        nav .links a::after { content: ""; position: absolute; left: 0; bottom: 0; width: 0; height: 1px; background: var(--red); transition: width 0.3s; }
        nav .links a:hover::after { width: 100%; }
        nav .cta { border: 1px solid var(--red); color: var(--red-glow); padding: 9px 20px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; border-radius: 2px; transition: all 0.3s; }
        nav .cta:hover { background: var(--red); color: #fff; box-shadow: 0 0 24px rgba(255, 45, 66, 0.5); }
        @media (max-width: 860px) { nav .links { display: none; } }

        section { position: relative; }

        #hero { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; }
        #hero .bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 20%, rgba(180, 21, 42, 0.18), transparent 60%), repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 90px), var(--bg); }
        #hero .eyebrow { font-size: 12px; letter-spacing: 0.35em; color: var(--silver); text-transform: uppercase; margin-bottom: 22px; opacity: 0.85; }
        #hero .wordmark { font-size: clamp(52px, 11vw, 148px); line-height: 0.9; }
        #hero .wordmark .r { color: var(--red); }
        .razor-wrap { position: relative; margin-top: 6px; }
        .razor-line { font-family: var(--font-serif); font-style: italic; font-size: clamp(24px, 4.4vw, 54px); position: relative; color: var(--text-dim); }
        .razor-line .reveal { position: absolute; top: 0; left: 0; width: 100%; height: 100%; color: var(--silver-light); clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
        #hero .sub { margin-top: 26px; font-size: 15px; color: var(--silver); letter-spacing: 0.02em; max-width: 420px; }
        #hero .cta-btn { margin-top: 44px; padding: 16px 42px; border: 1px solid var(--red); color: #fff; background: transparent; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; position: relative; overflow: hidden; border-radius: 2px; }
        #hero .cta-btn::before { content: ""; position: absolute; inset: 0; background: var(--red); transform: translateY(101%); transition: transform 0.35s ease; }
        #hero .cta-btn span { position: relative; z-index: 2; }
        #hero .cta-btn:hover::before { transform: translateY(0); }
        #hero .cta-btn:hover { box-shadow: 0 0 30px rgba(255, 45, 66, 0.45); }
        #scroll-ind { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); font-size: 10px; letter-spacing: 0.3em; color: var(--text-dim); display: flex; flex-direction: column; align-items: center; gap: 10px; }
        #scroll-ind .dash { width: 1px; height: 34px; background: var(--text-dim); position: relative; overflow: hidden; }
        #scroll-ind .dash::after { content: ""; position: absolute; top: -100%; left: 0; width: 100%; height: 100%; background: var(--red-glow); animation: dashmove 1.8s ease-in-out infinite; }
        @keyframes dashmove { 50% { top: 100%; } 100% { top: 100%; } }

        .section-pad { padding: 150px 6vw; }
        .head { display: flex; align-items: baseline; gap: 18px; margin-bottom: 60px; }
        .head .num { font-family: var(--font-display); color: var(--red); font-size: 14px; letter-spacing: 0.1em; }
        .head h2 { font-family: var(--font-display); font-size: clamp(34px, 5.4vw, 64px); letter-spacing: 0.03em; }
        .head .line { flex: 1; height: 1px; background: var(--line); }

        #about { background: var(--bg-alt); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; }
        .about-visual { aspect-ratio: 4 / 5; border: 1px solid var(--line); position: relative; background: radial-gradient(circle at 30% 20%, rgba(180, 21, 42, 0.15), transparent 55%), linear-gradient(160deg, #1a1816, #0c0b0a); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .about-visual svg { width: 46%; opacity: 0.9; }
        .about-visual .frame-label { position: absolute; bottom: 18px; left: 18px; font-size: 10px; letter-spacing: 0.25em; color: var(--text-dim); text-transform: uppercase; }
        .about-copy p { font-size: 16px; line-height: 1.9; color: var(--silver); margin-bottom: 22px; max-width: 480px; }
        .about-copy .big { font-family: var(--font-serif); font-style: italic; font-size: clamp(22px, 3vw, 34px); color: var(--text); line-height: 1.4; margin-bottom: 28px; }

        #experience { background: var(--bg); }
        .exp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .exp-card { background: var(--bg); padding: 44px 28px; transition: background 0.4s; }
        .exp-card:hover { background: var(--bg-alt); }
        .exp-card .n { font-family: var(--font-display); font-size: 13px; color: var(--red); letter-spacing: 0.1em; }
        .exp-card h3 { font-family: var(--font-display); font-size: 24px; margin: 18px 0 12px; letter-spacing: 0.02em; }
        .exp-card p { font-size: 13.5px; color: var(--text-dim); line-height: 1.7; }
        @media (max-width: 860px) { .exp-grid { grid-template-columns: 1fr 1fr; } .about-grid { grid-template-columns: 1fr; } }

        #services { background: var(--bg-alt); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); overflow: hidden; padding: 150px 0; }
        #services .head { padding: 0 6vw; }
        .h-track { display: flex; gap: 26px; width: max-content; padding: 0 6vw; }
        .svc-card { width: min(74vw, 340px); flex-shrink: 0; border: 1px solid var(--line); padding: 38px 30px; position: relative; background: linear-gradient(160deg, #171412, #0d0b0a); transition: border-color 0.35s, transform 0.35s; }
        .svc-card:hover { border-color: rgba(180, 21, 42, 0.6); transform: translateY(-6px); box-shadow: 0 20px 50px rgba(180, 21, 42, 0.15); }
        .svc-card .idx { font-size: 11px; letter-spacing: 0.2em; color: var(--text-dim); }
        .svc-card h3 { font-family: var(--font-display); font-size: 32px; margin: 26px 0 8px; }
        .svc-card .price { font-family: var(--font-serif); font-style: italic; color: var(--red-glow); font-size: 20px; }
        .svc-card p { margin-top: 16px; font-size: 13px; color: var(--text-dim); line-height: 1.7; }

        #transform { padding: 150px 6vw; }
        .ba-wrap { max-width: 760px; margin: 0 auto; position: relative; aspect-ratio: 16 / 10; border: 1px solid var(--line); overflow: hidden; }
        .ba-after, .ba-before { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; }
        .ba-before { background: linear-gradient(160deg, #1c1a18, #0a0908); color: var(--text-dim); }
        .ba-after { background: linear-gradient(160deg, #231014, #0a0908); color: var(--text); clip-path: inset(0 50% 0 0); }
        .ba-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.9) contrast(1.05); }
        .ba-before .ba-image { filter: grayscale(1) contrast(0.9) brightness(0.75); }
        .ba-after .ba-image { filter: contrast(1.08) brightness(1.02); }
        .ba-before .tag, .ba-after .tag { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 14px; position: relative; z-index: 1; }
        .ba-before .tag { color: var(--text-dim); }
        .ba-after .tag { color: var(--red-glow); }
        .ba-before h4, .ba-after h4 { font-family: var(--font-display); font-size: clamp(28px, 5vw, 48px); position: relative; z-index: 1; }
        #ba-handle { position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; background: var(--red); cursor: ew-resize; z-index: 2; }
        #ba-handle::after { content: "⟷"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 44px; height: 44px; background: var(--red); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .ba-caption { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-dim); letter-spacing: 0.1em; text-transform: uppercase; }

        #counters { background: var(--bg-alt); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 100px 6vw; }
        .counter-grid { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; max-width: 900px; margin: 0 auto; }
        .counter-grid div + div { border-left: 1px solid var(--line); }
        .counter-num { font-family: var(--font-display); font-size: clamp(40px, 7vw, 80px); color: var(--red-glow); }
        .counter-label { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--text-dim); margin-top: 6px; }

        #testi { padding: 150px 0; overflow: hidden; }
        #testi .head { padding: 0 6vw; }
        .marquee { display: flex; gap: 24px; width: max-content; animation: scroll-left 34s linear infinite; }
        .marquee:hover { animation-play-state: paused; }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .t-card { width: 340px; flex-shrink: 0; border: 1px solid var(--line); padding: 30px; background: var(--bg-alt); }
        .t-card .stars { color: var(--red-glow); letter-spacing: 2px; margin-bottom: 16px; font-size: 14px; }
        .t-card p { font-size: 14.5px; color: var(--silver); line-height: 1.7; margin-bottom: 18px; }
        .t-card .who { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-dim); }

        #booking { background: radial-gradient(ellipse at 50% 0%, rgba(180, 21, 42, 0.14), transparent 60%), #0a0706; padding: 150px 6vw; border-top: 1px solid var(--line); }
        .book-wrap { max-width: 640px; margin: 0 auto; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--line); backdrop-filter: blur(10px); border-radius: 6px; padding: 52px; }
        .book-wrap h2 { font-family: var(--font-display); font-size: clamp(30px, 5vw, 46px); text-align: center; margin-bottom: 8px; }
        .book-wrap .sub { text-align: center; color: var(--text-dim); font-size: 13px; letter-spacing: 0.05em; margin-bottom: 40px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
        .form-row.full { grid-template-columns: 1fr; }
        .field label { display: block; font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; }
        .field input, .field select, .field textarea { width: 100%; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--line); color: var(--text); padding: 12px 14px; font-family: var(--font-body); font-size: 14px; border-radius: 3px; transition: border-color 0.25s; }
        .field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--red); }
        .field textarea { resize: vertical; min-height: 80px; }
        #book-submit { width: 100%; margin-top: 14px; padding: 16px; background: var(--red); color: #fff; border: none; border-radius: 3px; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; cursor: none; transition: box-shadow 0.3s, background 0.3s; }
        #book-submit:hover { background: var(--red-glow); box-shadow: 0 0 30px rgba(255, 45, 66, 0.5); }
        @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } .book-wrap { padding: 34px 22px; } }

        #closing { height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: var(--bg); position: relative; }
        #closing h2 { font-family: var(--font-display); font-size: clamp(38px, 8vw, 110px); line-height: 0.98; }
        #closing h2 .r { color: var(--red); }
        #closing .cta-btn { margin-top: 40px; }

        footer { padding: 60px 6vw 40px; border-top: 1px solid var(--line); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 24px; align-items: center; }
        footer .logo { font-family: var(--font-display); font-size: 20px; letter-spacing: 0.1em; }
        footer .logo span { color: var(--red); }
        footer .flinks { display: flex; gap: 26px; font-size: 12px; color: var(--text-dim); letter-spacing: 0.08em; }
        footer .flinks a:hover { color: var(--red-glow); }
        footer .copy { font-size: 11px; color: var(--text-dim); width: 100%; text-align: center; margin-top: 26px; }

        #floating-wa { position: fixed; bottom: 28px; right: 28px; width: 58px; height: 58px; background: var(--red); border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 400; box-shadow: 0 0 0 0 rgba(180, 21, 42, 0.6); animation: pulse 2.4s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(180, 21, 42, 0.55); } 70% { box-shadow: 0 0 0 18px rgba(180, 21, 42, 0); } 100% { box-shadow: 0 0 0 0 rgba(180, 21, 42, 0); } }
        #floating-wa svg { width: 26px; height: 26px; fill: #fff; }

        .reveal-up { opacity: 0; transform: translateY(40px); }

        @media (prefers-reduced-motion: reduce) {
          .trj-root * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </div>
  );
}
