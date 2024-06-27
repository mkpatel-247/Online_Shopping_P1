import { API_PREFIX } from "src/environment/api.env"

const AUTH_PREFIX = `${API_PREFIX}/user`
const PRODUCT_PREFIX = `${API_PREFIX}/product`

export const AUTH = {
    LOGIN_API: `${AUTH_PREFIX}/login`,
    REGISTER_API: `${AUTH_PREFIX}/register`,
}

export const PRODUCT = {
    PRODUCT_DETAILS: `${PRODUCT_PREFIX}`,
    PRODUCT_BY_ID: `${PRODUCT_PREFIX}`,
    FEATURED_PRODUCT: `${PRODUCT_PREFIX}/related/`
}

export const CONTACT = {
    enquiry: `${API_PREFIX}/enquiry`,
}