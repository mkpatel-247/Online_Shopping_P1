import { API_PREFIX } from "src/environment/api.env"

export const AUTH_PREFIX = `${API_PREFIX}/user`
const PRODUCT_PREFIX = `${API_PREFIX}/product`
const PRODUCT_REVIEW = `${PRODUCT_PREFIX}/review`
export const CATEGORY = `${API_PREFIX}/category/get-all-categories`
const CART_PREFIX = `${API_PREFIX}/cart`
const CONFIG_PREFIX = `${API_PREFIX}/config`
export const WISHLIST = `${API_PREFIX}/wishlist`

export const AUTH = {
    LOGIN_API: `${AUTH_PREFIX}/login`,
    REGISTER_API: `${AUTH_PREFIX}/register`,
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
    BANNER: '/assets/dummyData/banner.json'
}
export const PAGES = {
    FAQ : '/assets/dummyData/faq.json',
    HELP : '/assets/dummyData/help.json'
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
    GET_SINGLE_ORDER: `${AUTH_PREFIX}/orders/`
}

export const CONFIGURATION = {
    SITE_CONFIG: `${CONFIG_PREFIX}/site-config`,
    LANUGAGE_COUNTRY: `${CONFIG_PREFIX}/language-country-config`
}