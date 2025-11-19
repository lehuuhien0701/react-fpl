"use client";
 
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HtmlParser } from "../html-parser";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { BookingForm } from "../booking-form";
import { LocaleSwitcher } from "../locale-switcher";
import { translations } from '@/translations/common';
import { Locale } from '@/translations/types';
import { useParams, usePathname } from 'next/navigation';
import { i18n } from "@/i18n.config";

interface Props {
  data: any;
  logo: any;
  footer: any;
  locale: string;
}

export function Navbar({ data, logo, footer, locale }: Props) {
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || (i18n.defaultLocale as Locale);
  const currentPath = usePathname(); // Get current pathname using usePathname
  const href = locale === i18n.defaultLocale ? '/' : `/${locale || ''}`;

  useEffect(() => {
		const svgOpen = document.querySelector<SVGElement>("svg.open");
		const svgClose = document.querySelector<SVGElement>("svg.close");
		const menu = document.querySelector<HTMLElement>(".menu-click");
		const menuText = document.querySelector<HTMLElement>(".menu-text"); // thêm dòng này
		const formSubmitButton = document.querySelector<HTMLButtonElement>('form button[type="submit"]');

		if (!svgOpen || !menu || !svgClose) return;

		// Inject CSS to make menu overlay fullscreen when body has .menu-open
		if (!document.getElementById("menu-open-style")) {
			const style = document.createElement("style");
			style.id = "menu-open-style";
			style.textContent = `
				body.menu-open { overflow: hidden !important; }
				.menu-click { display: none; }
				.menu-click.show { display: block !important; position: fixed !important; inset: 0 !important; z-index: 99999 !important; overflow: auto !important; }
			`;
			document.head.appendChild(style);
		}

		const openHandler = () => {
			menu.classList.remove("hidden");
			menu.classList.add("show");
			document.body.classList.add("menu-open");
		};

		const closeHandler = () => {
			menu.classList.remove("show");
			menu.classList.add("hidden");
			document.body.classList.remove("menu-open");
		};

		const onDocumentClick = (e: MouseEvent) => {
			const target = e.target as Node | null;
			if (!target) return;
			if (menu.contains(target)) return;
			if (svgOpen.contains(target)) return;
			if (menuText && menuText.contains(target)) return;
			if (svgClose && svgClose.contains(target)) return;
			closeHandler();
		};

		// Add click event to form submit button to trigger svg.close click
		const handleFormSubmitClick = () => {
			svgClose.dispatchEvent(new Event("click"));
		};
		if (formSubmitButton) {
			formSubmitButton.addEventListener("click", handleFormSubmitClick);
		}

		svgOpen.addEventListener("click", openHandler);
		if (menuText) menuText.addEventListener("click", openHandler);
		svgClose.addEventListener("click", closeHandler);
		document.addEventListener("click", onDocumentClick);

		return () => {
			svgOpen.removeEventListener("click", openHandler);
			if (menuText) menuText.removeEventListener("click", openHandler); // thêm dòng này
			svgClose.removeEventListener("click", closeHandler);
			document.removeEventListener("click", onDocumentClick);

			// Remove click event from form submit button
			if (formSubmitButton) {
				formSubmitButton.removeEventListener("click", handleFormSubmitClick);
			}

			document.body.classList.remove("menu-open");
		};
	}, []);
	
	// Toggle .box-submenu khi click .open-language (plain JS)
	useEffect(() => {
		const buttons = Array.from(document.querySelectorAll<HTMLElement>('.open-language'));
		if (buttons.length === 0) return;

		const onBtnClick = (e: Event) => {
			e.stopPropagation();
			const btn = e.currentTarget as HTMLElement;
			const container = btn.closest('.pr-5') || btn.parentElement;
			const box = container?.querySelector<HTMLElement>('.box-submenu');
			if (!box) return;

			// close other open boxes
			document.querySelectorAll<HTMLElement>('.box-submenu.show').forEach(b => {
				if (b !== box) {
					b.classList.remove('show');
					b.classList.add('hidden');
				}
			});

			if (box.classList.contains('show')) {
				box.classList.remove('show');
				box.classList.add('hidden');
			} else {
				box.classList.add('show');
				box.classList.remove('hidden');
			}
		};

		const onDocClick = (e: MouseEvent) => {
			const t = e.target as HTMLElement | null;
			if (!t) return;
			if (!t.closest('.box-submenu') && !t.closest('.open-language')) {
				document.querySelectorAll<HTMLElement>('.box-submenu.show').forEach(b => {
					b.classList.remove('show');
					b.classList.add('hidden');
				});
			}
		};

		buttons.forEach(b => b.addEventListener('click', onBtnClick));
		document.addEventListener('click', onDocClick);

		return () => {
			buttons.forEach(b => b.removeEventListener('click', onBtnClick));
			document.removeEventListener('click', onDocClick);
		};
	}, []);

	const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>({});

	const toggleSubmenu = (id: number) => {
		setOpenSubmenus(prev => ({
			...prev,
			[id]: !prev[id], // Toggle the visibility of the submenu
		}));
	};

	function renderMenuItems(menuData: any[]) {
		// Ensure menuData is an array
		if (!Array.isArray(menuData)) {
			return [];
		}

		return menuData
			.filter(item => item.show_in_menu && !item.parent) // Top-level items
			.sort((a, b) => a.order - b.order) // Sort by order
			.map(item => {
				const children = menuData
					.filter(child => child.parent?.id === item.id) // Find child items
					.sort((a, b) => a.order - b.order); // Sort children by order

				// Check if the current page matches the item's URL or any of its children
				const isActive =
					item.url === currentPath || children.some(child => child.url === currentPath);

				return (
					<li
						key={item.id}
						className={`font-normal text-[30px] leading-[72px] text-secondary border-l-[10px] ${
							isActive ? "border-[#D9BA92]" : "border-transparent"
						}`}
					>
						{item.url ? (
	<Link
		href={item.url}
		className={`pl-[10px] sm:pl-[30px] md:pl-[90px] ${item.url === currentPath ? "text-[#CCAB80]" : ""}`}
		onClick={(e) => {
			e.stopPropagation(); // Ngăn sự kiện lan lên <li>
			const svgClose = document.querySelector<SVGElement>("svg.close");
			if (svgClose) svgClose.dispatchEvent(new Event("click"));
		}}
	>
		{item.title}
	</Link>
) : (
							<div
								className="flex items-center gap-3 pl-[10px] sm:pl-[30px] md:pl-[90px] cursor-pointer"
								onClick={() => toggleSubmenu(item.id)}
							>
								<span>{item.title}</span>
								<svg
									width="12"
									height="10"
									viewBox="0 0 12 10"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className={`transition-transform duration-300 ${
										openSubmenus[item.id] ? "" : ""
									}`}
								>
									<path
										d="M5.7 9.34375L0.15 1.87891C0.05 1.74349 0 1.59961 0 1.44727C0 1.29492 0.0375 1.15104 0.1125 1.01562L0.8625 0H11.1375L11.8875 1.01562C11.9625 1.15104 12 1.29492 12 1.44727C12 1.59961 11.9625 1.74349 11.8875 1.87891L6.3375 9.34375C6.2375 9.44531 6.125 9.49609 6 9.49609C5.875 9.49609 5.7625 9.44531 5.6625 9.34375H5.7Z"
										fill="#CCAB80"
									/>
								</svg>
							</div>
						)}
						{children.length > 0 && (
							<ul
								className={`submenu pl-[30px] md:pl-[130px] mt-4 space-y-3 transition-all duration-300 overflow-hidden ${
									openSubmenus[item.id] ? "max-h-screen" : "max-h-0"
								}`}
							>
								{children.map(child => {
									const isChildActive = child.url === currentPath;

									return (
										<li
											key={child.id}
											className={`text-lg flex items-center ${
												isChildActive ? "border-[#D9BA92]" : "border-transparent"
											}`}
										>
											<Link
												href={child.url || "#"}
												className={`${isChildActive ? "text-[#CCAB80] flex" : "flex"}`}
												onClick={(e) => {
													e.stopPropagation(); // Ngăn sự kiện lan lên <li>
													const svgClose = document.querySelector<SVGElement>("svg.close");
													if (svgClose) svgClose.dispatchEvent(new Event("click"));
												}}
											>
												{child.icon?.url && (
													<Image
														className="mr-4"
														alt={child.icon.alternativeText || ""}
														src={strapiImage(child.icon.url)}
														width={24}
														height={24}
													/>
												)}
												{child.title}
											</Link>
										</li>
									);
								})}
							</ul>
						)}
					</li>
				);
			});
	}

  return (
    <div className='wrap-header relative z-[9999]'>
			<div className='max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 relative z-10'>
				<nav className="bg-white border-b border-white/10 sticky top-0">
					<div className="h-[88px] flex items-center justify-between">
						<h1 className='font-merriweather font-bold text-base md:text-xl leading-6'>
							<Link href={href} aria-label="Go to home" className="text-[#2F324A] hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#CCAB80] flex items-center gap-2">
								{logo?.image?.url && (
									<Image
										src={strapiImage(logo.image.url)}
										alt={logo?.image?.alternativeText || logo?.logo_text || "Logo"}
										width={logo?.image?.width || 30}
										height={logo?.image?.height || 27}
										className="inline-block"
									/>
								)}
								<span>
									{logo?.logo_text || "Fiduciaire Premier Luxembourg S.A."}
								</span>
							</Link>
						</h1>
						<div className="flex items-center gap-10">
							<div className='flex items-center'>
								
								<div className="block">
									<LocaleSwitcher currentLocale={locale} />
								</div>
								<div className='flex items-center md:border-l border-[#E5E7EB] ml-2 md:ml-10 pl-2 md:pl-10'>
									<svg className='open cursor-pointer' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect x="15.1602" y="30.2928" width="20.9723" height="3.22651" rx="1.61326" fill="#CCAB80"/>
										<rect x="23.2265" y="21.4199" width="12.9061" height="3.22651" rx="1.61326" fill="#CCAB80"/>
										<rect x="3.86743" y="13.3536" width="32.2651" height="3.22651" rx="1.61326" fill="#CCAB80"/>
										<rect x="15.1602" y="4.48069" width="20.9723" height="3.22651" rx="1.61326" fill="#CCAB80"/>
									</svg>
									<span className='font-inter cursor-pointer font-bold text-base leading-6 text-[#CCAB80] ml-[10px] menu-text hidden md:block'>
										{(translations as any)[currentLocale]?.menu || (translations as any)[i18n.defaultLocale]?.menu || "Menu"} 
									</span>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
 
 			{/* Menu overlay */}
 			<div className='menu-click bg-[linear-gradient(180deg,#383842_0%,#19191D_100%)] absolute top-0 left-0 right-0 z-[99999] hidden'>
 				<div className='max-w-[1400px] mx-auto w-full px-0 md:px-10 lg:px-20 relative'>
 					<div className='absolute top-6 right-[20px] sm:right-[40px] md:right-[90px] lg:right-[130px]'>
 						<svg className='close cursor-pointer' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
 							<path d="M11 29L29 11M11 11L29 29" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
 						</svg>
 					</div>
 
 					{/* primary nav list */}
 					<div className='sm:px-6 pb-0 pt-24'>
 						<ul className='space-y-6'>
 							{renderMenuItems(data)}
 						</ul>
 					</div>
					
 					
 				</div>
 		
 				{/* contact + form (kept) */}
 				<div className='pb-10 pt-10 mt-10 border-t border-[#ffffff33]'>
 					<div className='max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 relative'>
 						<div className='md:flex md:gap-10 sm:px-[20px] md:px-[100px]'>
 							<div className="mb-10 md:mb-0 md:max-w-[482px] w-full"> 
								<h2 className="mb-4 font-normal text-2xl leading-[34px] text-secondary">{footer?.contact_title || "Contact Us"}</h2>
								<div className="font-normal text-lg leading-6 text-[#CDCCD8] mb-8">
									<HtmlParser html={footer?.contact_description || ""} />
								</div>
								<div>
								{footer.phone && (
								<a href={`tel:${footer?.phone}`} className="text-[#CDCCD8] block mb-6 mr-5">
									<Image src="/footer-icon1.svg" alt="" width={20} height={20} className="inline-block mr-3" />
									{footer?.phone}
								</a>
								)}

								{footer.phone2 && (
								<a href={`tel:${footer?.phone2}`} className="text-[#CDCCD8] block mb-6">
									<Image src="/footer-icon2.svg" alt="" width={20} height={20} className="inline-block mr-3" />
									{footer?.phone2}
								</a>
								)}

								{footer.email && (
								<a href={`mailto:${footer?.email}`} className="text-[#CDCCD8] block mb-6">
									<Image src="/footer-icon3.svg" alt="" width={20} height={20} className="inline-block mr-3" />
									{footer?.email}
								</a>
								)}

								{footer.address && (
								<span className="text-[#CDCCD8] flex items-center mb-6">
									<Image src="/footer-icon4.svg" alt="" width={20} height={20} className="inline-block mr-3" />
									<span>
										<HtmlParser html={footer.address} />
									</span>
								</span>
								)}

								</div>
								<div>
								{Array.isArray(footer.social) && footer.social.length > 0 && (
									footer.social.map((s: any, i: number) => {
										const iconUrl = s.icon?.url ? strapiImage(s.icon.url) : undefined;
										const link = s.link ?? s.url ?? "#";
										return (
											<a
												key={`social-${i}`}
												href={link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-block mr-3"
											>
												{iconUrl && (
													<Image src={iconUrl} alt={s.icon?.name ?? `social-${i}`} width={20} height={20} />
												)}
											</a>
										);
									})
								)}
								</div>
							</div>
 							<BookingForm data={footer} />
 						</div>
 					</div>
 
 					<div className="language-mobile pt-10 flex gap-3 items-center justify-center sm:hidden text-white pr-5 md:pr-10 border-r border-[#E5E7EB] cursor-pointer relative">
 						 <LocaleSwitcher currentLocale={locale} variant="inline" /> 
 					</div>	


 				</div> 
 			</div>
		</div>
  );
}