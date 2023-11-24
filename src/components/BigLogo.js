import React from 'react';
import {Heading, Link} from '@chakra-ui/react';
import {Link as GatsbyLink} from 'gatsby';
import {StaticImage} from 'gatsby-plugin-image';

const BigLogo = () => (
  <Link
    as={GatsbyLink}
    className="flex items-center gap-1"
    to="/"
    textDecoration="none"
    _hover={{textDecoration: 'none'}}
  >
    <StaticImage
      src="../img/bml-icon.png"
      alt="Badminton Maisons-Laffitte icon"
      layout="fixed"
      width={114}
      height={85}
      backgroundColor="transparent"
      placeholder="blurred"
    />
    <Heading size={'sm'} color="text.inverted.main">
      Badminton Maisons-Laffitte
    </Heading>
  </Link>
);

export default BigLogo;
