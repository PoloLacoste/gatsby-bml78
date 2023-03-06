import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';
import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

// A simple header without an image
function Header({ heading, subheading }) {
  return (
    <Box
      as="header"
      backgroundColor="blue.700"
      py={{ base: 12, sm: 16, md: 20, lg: 24 }}
    >
      <Container maxW="7xl" textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          color="white"
        >
          {heading}
        </Heading>
        {subheading && (
          <Text fontSize={'xl'} color={'gray.100'} mt={6}>
            {subheading}
          </Text>
        )}
      </Container>
    </Box>
  );
}

// A different header for the project page
export function ArticleHeader({ heading, date }) {
  return (
    <Box
      as="header"
      //backgroundColor="blue.700"
      pt={{ base: 8, sm: 12, md: 20, lg: 28 }}
      pb={{ base: 6, sm: 10, md: 16, lg: 16 }}
    >
      <Container
        display="flex"
        maxW="7xl"
        textAlign="center"
        alignItems="center"
        flexDirection={{ base: 'column-reverse', md: 'column' }}
      >
        <Text
          fontSize={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
          color={'gray.500'}
          mt={4}
        >
          Publié le {format(new Date(date), 'PPP', { locale: frLocale })}
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: '2xl', sm: '3xl', md: '3xl', lg: '4xl' }}
          color={'black'}
          mt={4}
          maxW={'2xl'}
        >
          {heading}
        </Heading>
      </Container>
    </Box>
  );
}

export default Header;
