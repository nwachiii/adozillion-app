import React, {useEffect, useState} from 'react';
import {
  VStack,
  Image,
  useDisclosure,
  HStack,
  useMediaQuery,
  Flex,
  Stack,
  Text,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react';

import LayoutView from '../../../components/layout';

import {useMutation, useQuery} from 'react-query';
import {fetchEquity} from '../../../api/listing';
import {useRouter} from 'next/router';
import homeOwner from '../../../images/home-owner.svg';
import homeOwnerLight from '../../../images/home-owner-light.svg';
import MakeDepositModal from '../sections/MakeDeposit';
import HomeOwnersPacket from '../sections/HomeOwnersPacket';
import ErrorState from '../../../components/appState/error-state';
import RecurringModal from '../sections/recurringModal';
import Auth from '../../../hoc/Auth';
import deposit from '../../../images/make-a-depo-img.svg';
import depositLight from '../../../images/make-a-depo-img-light.svg';
import {LIGHT} from '../../../constants/names';
import giveFeedback from '../../../images/give-feedback.svg';
import giveFeedbackLight from '../../../images/give-feedback-light.svg';
import PurchaseFeedback from '../../../components/drawers/purchaseFeedback';

import AssetHeader from '../../../components/manageAssets/components/assetHeader';
import AssetWrapper from '../../../components/manageAssets/components/layoutWrapper/assetWrapper';
import AssetInfoWrapper from '../../../components/manageAssets/components/layoutWrapper/assetInfoWrapper';
import AssetOverviewWrapper from '../../../components/manageAssets/components/layoutWrapper/assetOverviewWrapper';

import Allocations from '../../../components/manageAssets/components/allocation';
import useLocalStorage from '../../../utils/hooks/useLocalStorage';
import {appCurrentTheme} from '../../../utils/localStorage';
import packetIcon from '/src/images/icons/homeOwnersPacketIcon.svg';

import recurringIcon from '../../../images/icons/recurringIcon.svg';

import feedbackIcon from '/src/images/icons/feedbackIcon.svg';
import PaymentPlanTransaction from '../../../components/manageAssets/payment_plan/paymentPlanTransaction';
import {Spinner} from '../../../ui-lib';
import {setUpRecurring} from '../../../api/Settings';
import ThreeDots from '../../../components/loaders/ThreeDots';

const absoluteStyle = {
  top: '20vh',
};

const PaymentPlan = () => {
  const {query} = useRouter();
  const toast = useToast();
  const recurringModal = useDisclosure();

  const [displayTab, setDisplayTab] = useState('transaction');
  const [user] = useLocalStorage('LoggedinUser');
  const depositModal = useDisclosure();
  const homeOwnersPacketModal = useDisclosure();
  const feedModal = useDisclosure();

  const {data, isLoading, isError, refetch} = useQuery(
    ['fetchUserEquity', query?.id],
    () => fetchEquity(query?.id),
    {enabled: !!query?.id}
  );

  const info = data?.data;

  const handleDisplaySwitch = prop => () => setDisplayTab(prop);

  const OVERVIEWINFO = [
    // {
    //   label: 'Property Type',
    //   value: info?.project?.building_type ?? '-',
    // },
    {
      label: 'Land Title',
      value: info?.project?.land_title ?? '-',
    },
    {
      label: 'Development Stage',
      value: info?.project?.status ?? '-',
    },
    {
      label: 'Unit size',
      value: `${info?.project?.land_size ?? '-'} sqm`,
    },

    {
      label: 'Allocated Unit',
      component: <Allocations equity={info} refetch={refetch} />,
    },
  ];
  const navBarStyle = {
    desktop: {
      display: {base: 'none', xl: 'flex'},
    },
    mobile: {
      display: 'none',
    },
  };

  const DisableAutoDebit = useMutation(formData => setUpRecurring(info?.id, formData), {
    onSuccess: res => {
      toast({
        title: `Recurring payments has been disabled!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    },
    onError: err => {
      toast({
        title: `Faild to disable recurring payments...`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleRecurringDeposit = () => {
    console.log('info', info);
    if (info?.auto_debit) {
      DisableAutoDebit.mutate({auto_debit: false});
    } else {
      recurringModal.onOpen();
    }
  };

  return (
    <>
      <LayoutView spacing="0px" navBarStyle={navBarStyle} noPadding>
        <AssetWrapper>
          {isError ? (
            <ErrorState />
          ) : isLoading || !info ? (
            <Spinner absoluteStyle={absoluteStyle} color="#DDB057" />
          ) : (
            <>
              <AssetHeader
                listingName={info?.project?.name ?? '-'}
                unitName={info?.unit?.unit_title ?? '-'}
                bgImg={info?.project?.photos?.[0]?.photo}
              />

              <AssetInfoWrapper
                maxW="1305px"
                justifySelf="stretch"
                w={{base: 'full', xl: 'full'}}
                pt={{base: '0px', xl: '23px'}}
                displayTab={displayTab}
                handleDisplaySwitch={handleDisplaySwitch}
              >
                <AssetOverviewWrapper
                  overviewInfo={OVERVIEWINFO}
                  maxH={{base: 'full', xl: '460px'}}
                  maxW={{base: 'full', xl: '626.856px'}}
                  w={{base: 'full', xl: 'full'}}
                  display={{
                    base: displayTab === 'overview' ? 'block' : 'none',
                    xl: 'block',
                  }}
                >
                  <HStack w="full" spacing={{base: '16px', xl: '11.4px'}}>
                    <Stack
                      p={{base: '6px 10px', xl: '9.5px 15px'}}
                      spacing={{base: '5.19px', xl: '7.6px'}}
                      onClick={depositModal.onOpen}
                      minH={{base: '72px', md: '74px'}}
                      border={{base: '0.648px solid #C3C3C3', xl: '0.95px solid #C3C3C3'}}
                      justify="start"
                      maxW="237.445px"
                      w="full"
                      alignSelf="stretch"
                      role="button"
                    >
                      <HStack spacing={{base: '5.19px', xl: '7.6px'}}>
                        <Image
                          src={appCurrentTheme === LIGHT ? deposit.src : depositLight.src}
                          alt="deposit icon"
                          boxSize={{base: '16px', xl: '22.8px'}}
                        />
                        <Text
                          fontSize={{base: '10px', md: '13.197px'}}
                          color="#000"
                          fontWeight="400"
                        >
                          Make a Deposit
                        </Text>
                      </HStack>
                      <Text
                        maxW={{base: '163px', md: '185px'}}
                        fontSize={{base: '9px', md: '8.448px'}}
                        color="#4B4B4B"
                        fontWeight="400"
                      >
                        Make a deposit by bank transfer or card payment
                      </Text>
                    </Stack>
                    <HStack
                      alignSelf="stretch"
                      p={{base: '6px 10px', xl: '9.5px 15px'}}
                      onClick={handleRecurringDeposit}
                      minH={{base: '72px', md: '74px'}}
                      border={{base: '0.648px solid #C3C3C3', xl: '0.95px solid #C3C3C3'}}
                      w="full"
                      role="button"
                      justify="space-between"
                    >
                      <Stack spacing={{base: '5.19px', xl: '7.6px'}}>
                        <HStack spacing={{base: '5.19px', xl: '7.6px'}}>
                          <Image
                            src={appCurrentTheme === LIGHT ? recurringIcon.src : recurringIcon.src}
                            alt="deposit icon"
                            boxSize={{base: '16px', xl: '22.8px'}}
                          />
                          <Text
                            fontSize={{base: '10px', md: '13.197px'}}
                            color="#000"
                            fontWeight="400"
                          >
                            {info?.auto_debit
                              ? 'Disable Recurring Deposit'
                              : 'Enable Recurring Deposit'}
                          </Text>
                        </HStack>
                        <Text
                          maxW={{base: '171px', md: '185px'}}
                          fontSize={{base: '9px', md: '8.448px'}}
                          color="#4B4B4B"
                          fontWeight="400"
                        >
                          {info?.auto_debit
                            ? 'By disabling, you will not automatically be debited from your fund source'
                            : 'By enabling, you wouldd automatically be debited from your fund source'}
                        </Text>
                      </Stack>
                      {DisableAutoDebit.isLoading ? (
                        <ThreeDots />
                      ) : (
                        <HStack
                          display={{base: 'none', md: 'flex'}}
                          justify="center"
                          bg="#2F2F2F"
                          p="5.699px 15.197px"
                          role="button"
                        >
                          <Text fontSize="11.297px" color="#ffffff" fontWeight="400">
                            {info?.auto_debit ? 'Disable' : 'Set'}
                          </Text>
                        </HStack>
                      )}
                    </HStack>
                  </HStack>
                  <Divider
                    display={{lg: 'none', base: 'block'}}
                    border="none"
                    h="0.95px"
                    bg="#E4E4E4"
                  />

                  <Flex gap={{base: '16px', xl: '15.2px'}}>
                    <Button
                      w="50%"
                      className="inter-semibold"
                      _hover={{
                        bg: 'transparent',
                      }}
                      _focus={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      _active={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      borderRadius="0"
                      borderColor="#C3C3C3"
                      border={{base: '0.648px solid #C3C3C3', xl: '0.95px solid #C3C3C3'}}
                      fontSize={{base: '9.5px', sm: '12px', md: '13.197px'}}
                      onClick={homeOwnersPacketModal.onOpen}
                      color="#111926"
                      h={{base: '48px', xl: '41.79px'}}
                      bg="transparent"
                      fontWeight="400"
                      iconSpacing={{base: '10.68px', xl: '15.2px'}}
                      leftIcon={
                        <Image
                          alt="next_image"
                          boxSize={{base: '16px', xl: '22.795px'}}
                          src={appCurrentTheme === LIGHT ? homeOwner.src : homeOwnerLight.src}
                        />
                      }
                    >
                      Home Owners Packet
                    </Button>
                    <Button
                      w="50%"
                      className="inter-semibold"
                      _hover={{
                        bg: 'transparent',
                      }}
                      _focus={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      _active={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      fontWeight="400"
                      borderRadius="0"
                      borderColor="#C3C3C3"
                      border={{base: '0.648px solid #C3C3C3', xl: '0.95px solid #C3C3C3'}}
                      fontSize={{base: '9.5px', sm: '12px', md: '13.197px'}}
                      onClick={feedModal.onOpen}
                      color="#111926"
                      h={{base: '48px', xl: '41.79px'}}
                      bg="transparent"
                      leftIcon={
                        <Image
                          alt="next_image"
                          boxSize={{base: '16px', xl: '22.795px'}}
                          src={appCurrentTheme === LIGHT ? giveFeedback.src : giveFeedbackLight.src}
                        />
                      }
                    >
                      Give Feedback
                    </Button>
                  </Flex>
                </AssetOverviewWrapper>

                <PaymentPlanTransaction displayTab={displayTab} equityInfo={info} />
              </AssetInfoWrapper>
              <MakeDepositModal info={info} depositModal={depositModal} />
              <HomeOwnersPacket equityId={info?.id} modal={homeOwnersPacketModal} />
              <PurchaseFeedback equity={info} feedModal={feedModal} />
              <RecurringModal refetch={refetch} equity={info} recurringModal={recurringModal} />
            </>
          )}
        </AssetWrapper>
      </LayoutView>
    </>
  );
};

export default Auth(PaymentPlan, {color: '#DDB057', absoluteStyle});