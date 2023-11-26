import React from 'react';
import {Box, Heading, Link} from '@chakra-ui/react';
import {Link as GatsbyLink} from 'gatsby';
import {StaticImage} from 'gatsby-plugin-image';

const BigLogo = ({color}) => {
  return (
    <Link
      as={GatsbyLink}
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
      to="/"
      textDecoration="none"
      _hover={{textDecoration: 'none'}}
    >
      <Box width={{base: 12, md: 14}}>
        <StaticImage
          src="../img/bml-icon.png"
          alt="Badminton Maisons-Laffitte icon"
          layout="constrained"
          width={114}
          height={85}
          backgroundColor="transparent"
          placeholder="blurred"
        />
      </Box>
      <Heading fontSize={{base: 'md', sm: 'lg'}} color={color || 'text.main'}>
        Badminton Maisons-Laffitte
      </Heading>
    </Link>
  );
};

export default BigLogo;
