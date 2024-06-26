export const API_PREFIX = 'http://192.168.1.236:3000';

export const AUTH = {
    LOGIN_API: `${API_PREFIX}/user/login`,
    REGISTER_API: `${API_PREFIX}/user/register`,
}

export const PRODUCT = {
    PRODUCT_DETAILS: `${API_PREFIX}/product`,
    PRODUCT_BY_ID: `${API_PREFIX}/product/`,
    FEATURED_pRODUCT: `${API_PREFIX}/product/related/`
}