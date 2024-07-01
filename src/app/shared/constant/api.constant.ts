import { API_PREFIX } from "src/environment/api.env"

const AUTH_PREFIX = `${API_PREFIX}/user`
const PRODUCT_PREFIX = `${API_PREFIX}/product`
export const CATEGORY = `${API_PREFIX}/category/get-all-categories`

export const AUTH = {
    LOGIN_API: `${AUTH_PREFIX}/login`,
    REGISTER_API: `${AUTH_PREFIX}/register`,
}

export const PRODUCT = {
    PRODUCT_DETAILS: `${PRODUCT_PREFIX}`,
    PRODUCT_BY_ID: `${PRODUCT_PREFIX}/`,
    RELATED_PRODUCT: `${PRODUCT_PREFIX}/related/`
}

export const CONTACT = {
    enquiry: `${API_PREFIX}/enquiry`,
}

export const HOME = {
    banner: '/assets/dummyData/banner.json'
}