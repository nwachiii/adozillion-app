import {useEffect, useState} from 'react';
import {
  DrawerContent,
  Flex,
  Box,
  Text,
  Drawer,
  DrawerOverlay,
  HStack,
  Icon,
} from '@chakra-ui/react';
import Summary from './summary';
import ConfirmValidate from './confirmValidate';
import Dispute from './dispute';
import {BsArrowLeft} from 'react-icons/bs';
import isMobile from '../../../utils/extras';
import AssetsList from './assetsList';
import {ChevronLeftIcon, CloseIcon} from '@chakra-ui/icons';

const PendingTransactions = ({equitiesData, drawer, refetch, isLoading}) => {
  const [type, setType] = useState('list');
  const [equityData, setEquityData] = useState(null);

  useEffect(() => {
    setEquityData(equitiesData?.[0]);
  }, [equitiesData]);

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const handleClose = () => {
    setType('list');
  };

  const validationRequestArray = equityData?.validation_requests || [];
  const validation_requestsId = validationRequestArray?.[validationRequestArray?.length - 1]?.id;

  return (
    <Drawer
      onCloseComplete={handleClose}
      blockScrollOnMount
      scrollBehavior="inside"
      onClose={drawer?.onClose}
      isOpen={drawer?.isOpen}
      placement={isMobile ? 'bottom' : 'right'}
    >
      <DrawerOverlay />
      <DrawerContent
        top="unset !important"
        bottom={{base: 'unset', md: '24px !important'}}
        right={{base: 'unset', md: '24px !important'}}
        w="full"
        minH="20vh"
        h={'fit-content'}
        maxW={'500px'}
        bg="#FBFCFC"
        px="0"
        position={'relative'}
      >
        <Box
          px={{base: '14px', md: '21px'}}
          py={{base: '18px', md: '32px'}}
          mb="38px"
          position={'absolute'}
          top="0"
          bg="white"
          right={0}
          w="full"
          zIndex={200}
        >
          <Flex w="full" h="20px" justify={'space-between'} align={'center'}>
            {type === 'dispute' ? (
              <HStack align={'center'}>
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={() => setType('summary')}
                  fontSize={'35px'}
                  color={'text'}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={400}
                  className="gilda-display-regular"
                >
                  Dispute
                </Text>
              </HStack>
            ) : type === 'validate' ? (
              <HStack align={'center'}>
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={() => setType('summary')}
                  fontSize={'35px'}
                  color={'text'}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={400}
                  className="gilda-display-regular"
                >
                  Validate
                </Text>
              </HStack>
            ) : type === 'summary' ? (
              <HStack align={'center'}>
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={() => setType('list')}
                  fontSize={'35px'}
                  color={'text'}
                />
                <Text
                  color="text"
                  fontSize={'23px'}
                  fontWeight={400}
                  className="gilda-display-regular"
                >
                  Validate Transaction
                </Text>
              </HStack>
            ) : (
              <Text
                color="text"
                fontSize={'23px'}
                fontWeight={400}
                className="gilda-display-regular"
              >
                Validate Transaction
              </Text>
            )}
            <CloseIcon
              cursor={'pointer'}
              fontSize={'14px'}
              color="text"
              onClick={drawer?.onClose}
            />
          </Flex>
        </Box>
        {/* <Box w="full" borderBottom="1px solid" borderColor={'shade'} mb="21px" mt={'14px'} /> */}

        <Box
          minH={{base: '45vh', md: '55vh'}}
          maxH="65vh"
          pt="90px"
          w="full"
          h={'fit-content'}
          overflowY={'scroll'}
        >
          {type === 'summary' ? (
            <Summary
              equityData={equityData}
              setType={setType}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : type === 'validate' ? (
            <ConfirmValidate
              refetch={refetch}
              validation_requestsId={validation_requestsId}
              equityData={equityData}
              setType={setType}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : type === 'dispute' ? (
            <Dispute
              drawer={drawer}
              validation_requestsId={validation_requestsId}
              equityData={equityData}
              setType={setType}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : (
            <AssetsList
              equitiesData={equitiesData}
              equityData={equityData}
              setEquityData={setEquityData}
              isLoading={isLoading}
              drawer={drawer}
              validation_requestsId={validation_requestsId}
              setType={setType}
              customScrollbarStyles={customScrollbarStyles}
            />
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default PendingTransactions;
