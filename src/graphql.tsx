import { DocumentNode } from "graphql";
import { API_URL, SHOP_ID } from "./constants";
import gql from 'graphql-tag';
import {
    createClient,
    AnyVariables
  } from "urql";

// Create urql client
export const client = createClient({
    url: `${API_URL}/graphql`,
});

// Add Agora store header
export const getContext = () => {
    return {
        fetchOptions: {
            headers: {
                "X-AGORA-STORE-ID": SHOP_ID
            }
        }
    }
}

export const CATEGORIES_TITLE_QUERY = gql`
query {
    categories {
        title
    }
}
`;

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