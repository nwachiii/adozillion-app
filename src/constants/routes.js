export const BaseURL_ONE = 'https://dev.matadortrust.com/v1';
export const BaseURL_TWO = 'https://dev.matadortrust.com/v2';

export const ROUTES = {};

export const EXTERNAL_ROUTES = {};

// export const BASE_ROUTE = "https://matadortrust.com";

const isEnvDev = process && process.env.NODE_ENV === 'development';

// export const STORE__DOMAIN = 'cherry.6787878.com';
export const STORE__DOMAIN = 'adozillion.6787878.com';

export const STORENAMEFROMDOMAIN = 'adozillion';
// 'adozillion';

export const storeName = 'adozillion';
// 'adozillion';

export const appWindow = typeof window !== 'undefined' ? window : null;

export const LoggedinUser =
  appWindow && localStorage
    ? JSON?.parse(localStorage.getItem('LoggedinUser'))
    : global?.location?.reload();

export const STORE =
  appWindow && localStorage
    ? JSON?.parse(localStorage.getItem('storeDetails'))
    : global?.location?.reload();

export const BUSINESS_ID = () =>
  appWindow && localStorage
    ? JSON?.parse(localStorage.getItem('businessId'))
    : global?.location?.reload();
