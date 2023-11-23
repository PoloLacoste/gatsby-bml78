import React from 'react';
import {Box, Container, Heading} from '@chakra-ui/react';
import SeeMoreButton from './SeeMoreButton';

const HomeSection = ({title, moreButtonRedirectTo, children, ...rest}) => {
  return (
    <Container maxW="7xl" mt={{base: 8, md: 12, lg: 16}} as="section" {...rest}>
      <div className="flex justify-between items-baseline">
        <Heading as="h2" size="xl">
          {title}
        </Heading>
        {moreButtonRedirectTo && (
          <SeeMoreButton
            display={{base: 'none', md: 'flex'}}
            to={moreButtonRedirectTo}
          />
        )}
      </div>
      <Box mt={{base: 4, md: 6, lg: 8}}>{children}</Box>
      {moreButtonRedirectTo && (
        <SeeMoreButton
          display={{base: 'flex', md: 'none'}}
          to={moreButtonRedirectTo}
          variant="outline"
          my={4}
          mx="auto"
          maxW="2xs"
        />
      )}
    </Container>
  );
};

export default HomeSection;
