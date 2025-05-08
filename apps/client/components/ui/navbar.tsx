'use client'
import React from 'react'
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@heroui/navbar'
import { Link } from '@heroui/link'
import { link as linkStyles } from '@heroui/theme'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/ui/theme-switch'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [shouldRenderMenu, setShouldRenderMenu] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    if (isMenuOpen) {
      setShouldRenderMenu(true)
    } else {
      // Delay unmounting so close animation can play
      const timeout = setTimeout(() => setShouldRenderMenu(false), 300) // match duration
      return () => clearTimeout(timeout)
    }
  }, [isMenuOpen])

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      shouldHideOnScroll
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">CirQ</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: 'foreground' }),
                    'data-[active=true]:text-primary data-[active=true]:font-medium',
                    isActive ? 'text-primary font-medium' : 'text-foreground'
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            )
          })}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          className="block" // Always show the burger menu
        />
      </NavbarContent>

      {shouldRenderMenu && (
        <NavbarMenu
          id="navbar-menu"
          className={clsx(
            'transition-all duration-300 transform',
            isMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
        >
          {siteConfig.navMenuItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NextLink
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(isActive ? 'text-primary font-medium' : 'text-foreground')}
                >
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            )
          })}
        </NavbarMenu>
      )}
    </HeroUINavbar>
  )
}
