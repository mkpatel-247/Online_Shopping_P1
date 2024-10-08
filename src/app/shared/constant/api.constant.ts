import { API_PREFIX } from "src/environment/api.env"

export const AUTH_PREFIX = `${API_PREFIX}/user`
const PRODUCT_PREFIX = `${API_PREFIX}/product`
const PRODUCT_REVIEW = `${PRODUCT_PREFIX}/review`
export const CATEGORY = `${API_PREFIX}/category/get-all-categories`
const CART_PREFIX = `${API_PREFIX}/cart`
const CONFIG_PREFIX = `${API_PREFIX}/config`
export const WISHLIST = `${API_PREFIX}/wishlist`
export const COUPON = `${API_PREFIX}/coupon/`;
const FAQs_PREFIX = `${API_PREFIX}/FAQ/`;

export const AUTH = {
    LOGIN_API: `${AUTH_PREFIX}/login`,
    REGISTER_API: `${AUTH_PREFIX}/register`,
    FORGOT_PASSWORD: `${AUTH_PREFIX}/forgot-password`,
    CHANGE_PASSWORD: `${AUTH_PREFIX}/password/change`,
    RESET_PASSWORD: `${AUTH_PREFIX}/verify-and-change-password/`
}

export const PRODUCT = {
    PRODUCT_DETAILS: `${PRODUCT_PREFIX}`,
    PRODUCT_BY_ID: `${PRODUCT_PREFIX}/`,
    RELATED_PRODUCT: `${PRODUCT_PREFIX}/related/`,
    ADD_REVIEW: `${PRODUCT_REVIEW}/`,
    GET_REVIEW: `${PRODUCT_REVIEW}/`
}

export const CONTACT = {
    ENQUIRY: `${API_PREFIX}/enquiry`,
}

export const HOME = {
    OFFER_BANNER: `${API_PREFIX}/offer`
}
export const PAGES = {
    FAQ_CATEGORY: `${FAQs_PREFIX}`,
    CATEGORY_WISE_FAQ: `${FAQs_PREFIX}/`,
    COMMON_PAGES: `${API_PREFIX}/pages/`
}
export const CART = {
    CREATE_CART_ITEM: `${CART_PREFIX}/manage-cart`,
    GET_CART_ITEMS: `${CART_PREFIX}`,
    DEL_CART_ITEM: `${CART_PREFIX}/`,
    CREATE_MULTIPLE_ITEMS: `${CART_PREFIX}/add-multiple-products`
}

export const ORDERS = {
    PLACE_ORDER: `${API_PREFIX}/checkout`,
    GET_ORDERS: `${AUTH_PREFIX}/orders`,
    GET_SINGLE_ORDER: `${AUTH_PREFIX}/orders/`,
    CANCEL_ORDER: `${AUTH_PREFIX}/orders/`
}

export const CONFIGURATION = {
    SITE_CONFIG: `${CONFIG_PREFIX}/site-config`,
    LANGUAGE_COUNTRY: `${CONFIG_PREFIX}/language-country-config`
}