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