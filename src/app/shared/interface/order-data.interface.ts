export interface OrderData {
    "paymentMethod": string,
    "pickUpPerson": {
        "firstName": string,
        "lastName": string,
        "email": string,
        "contact": number
    },
    "address": {
        "line1": string,
        "line2": string,
        "country": string,
        "state": string,
        "city": string,
        "zip": number
    }
}