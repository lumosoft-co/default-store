import { DocumentNode } from "graphql";
import { API_URL, SHOP_ID } from "./constants";
import gql from 'graphql-tag';
import {
    createClient,
    AnyVariables
  } from "urql";

/**
 * Create urql client
 * */
export const client = createClient({
    url: `${API_URL}/graphql`,
});

/** 
 * Add Agora store header
 */ 
export const getContext = () => {
    return {
        fetchOptions: {
            headers: {
                "X-AGORA-STORE-ID": SHOP_ID
            }
        }
    }
}

export const BRANDING_QUERY = gql`
query {
    shop {
        branding {
            logo
            icon
        }
    }
}
`

export const POPULAR_ITEMS = gql`
query {
    topProducts {
        title
        image
    	price {
          price
        }
    }
}
`

export const PRODUCT_QUERY = gql`
query Product($product: String!) {
  productByHandle(handle: $product) {
    title
    description
    price {
      price
      listPrice
      purchaseTypes
    }
    image
  }
}
`

/**
 * Categories queries
 */
export const CATEGORIES_TITLE_QUERY = gql`
query {
    categories {
      handle
      title
      subcategories {
        handle
        title
      }
    }
  }
`;

export const CATEGORY_QUERY = gql`
query Category($category: String!) {
    categoryByHandle(handle: $category) {
      handle
      title
      description
      displayType
      products {
        handle
        title
        price {
          price
          listPrice
        }
        image
      }
    }
  }
`

/**
 * Cart Queries
 */
export const CART_PRODUCT_QUERY = `
query Cart($cart: ID!) {
  cart(id: $cart) {
    items {
      id
      product {
        handle
      }
    }
  }
}
`

export const CART_CREATE = `
mutation CartCreate($ign: String!, $uuid: String!, $country: String!, $productId: ID!, $quantity: Int!) {
  cartCreate(
    identity: {
        username: $ign,
        uuid: $uuid,
        countryCode: $country
    }
    lines: [
      {
        product: $productId,
        quantity: $quantity
      }
    ]
  ) {
    id
  }
}
`