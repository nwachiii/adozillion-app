import {
  Divider,
  GridItem,
  HStack,
  Heading,
  Hide,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

const AssetOverviewWrapper = ({overviewInfo, children, ...rest}) => {
  const isXL = useBreakpointValue({base: false, xl: true});
  return (
    <Stack
      w="full"
      maxW="626.86px"
      pt={{base: '23.5px'}}
      p={{xl: '23.5px'}}
      border={{base: 'none', xl: '1.125px solid #E4E4E4'}}
      bg={{xl: '#F5F5F5', base: 'transparent'}}
      spacing={{base: '24px', xl: '23.5px'}}
      sx={{
        '& > *:not(style) ~ *:not(style)': {
          marginTop: ['23.5px', null, '24px'],
          '@media screen and (min-width: 80em)': {
            marginTop: '23.5px',
          },
        },
      }}
      {...rest}
    >
      {isXL ? (
        <Text
          as="header"
          fontSize="21.845px"
          fontWeight="600"
          color="#191919"
          lineHeight="31px"
          // className="gilda-display-regular"
          display={{base: 'none', xl: 'inline-block'}}
        >
          OVERVIEW
        </Text>
      ) : null}

      {isXL ? (
        <Divider
          display={{base: 'none', xl: 'inline-block'}}
          border="none"
          h="0.95px"
          bg="#E4E4E4"
        />
      ) : null}

      {overviewInfo.map((info, idx) => {
        return (
          <HStack key={idx} justify="space-between" w="full">
            <Text
              fontSize={{base: '12px', md: '13.664px'}}
              lineHeight={{base: '14px', md: '17px'}}
              fontWeight="400"
              color="#606060"
            >
              {info.label}
            </Text>
            {info?.component || (
              <Text
                fontSize={{base: '12px', md: '13.664px'}}
                lineHeight={{base: '14px', md: '17px'}}
                fontWeight="400"
                color="#191919"
              >
                {info?.value}
              </Text>
            )}
          </HStack>
        );
      })}

      <Divider border="none" h="0.95px" bg="#E4E4E4" />

      {/* <Stack spacing={3}> */}
      {children}
      {/* </Stack> */}
    </Stack>
  );
};

export default AssetOverviewWrapper;
