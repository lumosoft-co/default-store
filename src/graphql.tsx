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

export const NAVIGATION_QUERY = gql`
query {
    shop {
      id
      branding {
        logo
        icon
      }
      categories {
        id
        title
        handle
        order
        subcategories {
          id
          title
          handle
          order
        }
      }
    }
}
`

export const POPULAR_ITEMS = gql`
query {
    topProducts {
        id
        handle
        title
        image
    	  price {
          price
          listPrice
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
export const CATEGORIES_QUERY = gql`
query {
  categories {
    handle
    title
    description
    subcategories {
      handle
      title
      description
    }
  }
}
`

export const CATEGORY_QUERY = gql`
query Category($category: String!) {
    categoryByHandle(handle: $category) {
      handle
      title
      description
      displayType
      products {
        id
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

export const PRODUCTS_BY_CATEGORY_QUERY = gql`
query Category($category: String!) {
    categoryByHandle(handle: $category) {
      products {
        id
        handle
        title
        image
        price {
          price
          listPrice
        }
      }
    }
  }
`


/**
 * Cart Queries
 */
export const CART_SIZE_QUERY = gql`
query Cart($cart: ID!) {
  cart(id: $cart) {
    items {
      quantity
    }
  }
}
`

export const CART_PRODUCT_QUERY = gql`
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

export const CART_LINE_ADD = gql`
mutation CartAdd($cartId: ID!, $productId: ID!, $quantity: Int!) {
  cartLineAdd(cartId: $cartId, line: {
    product: $productId,
    quantity: $quantity
  }) {
    id
  }
}
`

export const CART_QUERY = gql`
query Cart($cart: ID!) {
  cart(id: $cart) {
    identity {
      username
      uuid
    }
    cost {
      actual
    }
    discounts
    items {
      id
      product {
        handle
        title
        image
      }
      quantity
      cost {
        actual
        list
      }
    }
  }
}`

export const CART_CREATE = gql`
mutation CartCreate($ign: String!, $uuid: String!) {
  cartCreate(
    identity: {
        username: $ign,
        uuid: $uuid
    }
  ) {
    id
  }
}
`

export const CART_LINE_REMOVE = `
mutation CartRemove($cartId: ID!, $productId: ID!, $quantity: Int!) {
  cartLineRemove(cartId: $cartId, line: {
    product: $productId,
    quantity: $quantity
  }) {
    id
  }
}
`

export const CART_LINE_DELETE = `
mutation CartRemove($cartId: ID!, $lineId: ID!) {
  cartLineDelete(cartId: $cartId, lineId: $lineId) {
    id
  }
}
`

export const CART_LINE_UPDATE = `
mutation CartUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {
  cartLineUpdate(cartId: $cartId, lineId: $lineId, quantity: $quantity) {
    id
  }
}
`