import React, {useMemo, useState} from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import {Box, Flex, HStack} from '@chakra-ui/react';
import MobileMenu from './MobileMenu';
import DropdownNavLink from './DropdownNavLink';
import NavLink from './NavLink';
import {useScroll} from '../../hooks/useScroll';
import Logo from '../Logo';
import {Container} from '../Sections';

// TODO use dark / light mode instead of isTransparent
// TODO review animation on scroll with isTransparent
const Navbar = ({isTransparentAtTop, ...rest}) => {
  const {scrollY, scrollDirection} = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const {infosPratiquesMenu, resultsMenu} = useStaticQuery(graphql`
    query NAVBAR {
      infosPratiquesMenu: markdownRemark(
        frontmatter: {menuKey: {eq: "infos-pratiques"}}
      ) {
        frontmatter {
          menuKey
          items {
            title
            url
            items {
              title
              url
            }
          }
        }
      }

      resultsMenu: markdownRemark(frontmatter: {menuKey: {eq: "resultats"}}) {
        frontmatter {
          menuKey
          items {
            title
            url
            items {
              title
              url
            }
          }
        }
      }
    }
  `);

  const MENU = useMemo(() => {
    const extractSubMenus = (item, index) => {
      if (item.items) {
        return {
          key: `${item.title} - ${index}`,
          label: item.title,
          options: item.items.map(item => ({
            key: `${item.url} - ${item.title}`,
            label: item.title,
            to: item.url,
          })),
        };
      }

      return {
        key: `${item.url} - ${item.title}`,
        label: item.title,
        to: item.url,
      };
    };
    const infoPratiquesCategories =
      infosPratiquesMenu.frontmatter.items.map(extractSubMenus);
    const resultsCategories =
      resultsMenu.frontmatter.items.map(extractSubMenus);
    return [
      {
        key: 'accueil',
        label: 'Accueil',
        to: '/',
      },
      {
        key: 'actus',
        label: 'Actualités',
        to: '/articles',
        partial: true,
      },
      {
        key: 'infospratiques',
        label: 'Infos Pratiques',
        options: [
          ...infoPratiquesCategories,
          /*{
            key: 'Category test',
            label: 'Category test',
            options: [
              {
                key: `test1`,
                label: 'Test 1',
                to: '/infos-pratiques/inscription',
              },
              {
                key: `test2`,
                label: 'Test 2',
                to: '/infos-pratiques/bureau',
              }
            ],
          },*/
        ],
      },
      {
        key: 'resultats',
        label: 'Résultats',
        options: [
          {
            key: 'allresults',
            label: 'Tous les résultats',
            to: '/results',
          },
          ...resultsCategories,
        ],
      },
      {
        key: 'contact',
        label: 'Contact',
        to: '/contact',
      },
    ];
  }, [infosPratiquesMenu, resultsMenu]);

  const isTransparent = isTransparentAtTop && scrollY < 1;

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <Box
      as="nav"
      shadow={scrollY < 1 ? undefined : 'xl'}
      bg={isTransparent ? 'transparent' : 'bg.main'}
      sx={{
        w: '100%',
        zIndex: 30,
        top: 0,
        position: 'fixed',
        transitionDuration: '300ms, 150ms, 150ms, 300ms',
        transitionProperty: 'transform, background-color, color, box-shadow',
        transitionTimingFunction: 'ease-in-out',
        transform:
          scrollDirection === 'down' || scrollY < 200
            ? 'translateY(0)'
            : 'translateY(-100%)',
      }}
      {...rest}
    >
      <Container
        py={0}
        display={{base: 'block', lg: 'flex'}}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" py={2} justifyContent="space-between">
          <Logo color={isTransparent ? 'text.inverted.main' : 'text.main'} />

          {/* Mobile menu button */}
          <Box display={{base: 'flex', lg: 'none'}}>
            <Box
              as="button"
              type="button"
              _hover={{
                color: isTransparent ? 'gray.200' : 'gray.600',
              }}
              _focus={{
                color: isTransparent ? 'gray.200' : 'gray.600',
                outline: 'none',
              }}
              color={isTransparent ? 'gray.100' : 'gray.500'}
              aria-label="toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Box as="svg" viewBox="0 0 24 24" w={6} h={6} fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </Box>
            </Box>
          </Box>
        </Flex>

        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(!menuOpen)}
          menu={MENU}
        />

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <Box display={{base: 'none', lg: 'flex'}} alignItems="center">
          <HStack w="full" alignItems="center" mx={6} my={2}>
            {MENU.map(menu => {
              if (menu.options) {
                return (
                  <DropdownNavLink
                    key={menu.key}
                    label={menu.label}
                    options={menu.options}
                    onClick={handleMenuClose}
                    isTransparent={isTransparent}
                  />
                );
              }

              return (
                <NavLink
                  key={menu.key}
                  to={menu.to}
                  onClick={handleMenuClose}
                  label={menu.label}
                  partial={menu.partial}
                  isTransparent={isTransparent}
                />
              );
            })}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
