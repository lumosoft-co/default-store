import { AnyVariables } from "urql";

interface IProductsPageProps {
    title: string;
    caption: string;
    query: DocumentNode;
    variables?: AnyVariables;
    field: string;
}