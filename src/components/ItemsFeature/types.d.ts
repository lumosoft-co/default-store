import { DocumentNode } from "graphql"
import { AnyVariables } from "urql";

export interface IFeatureProps {
    title: string;
    caption: string;
    query: DocumentNode;
    variables?: AnyVariables;
}