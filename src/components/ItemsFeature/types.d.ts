import { DocumentNode } from "graphql"
import { AnyVariables } from "urql";

export type IFeatureProps = {
    title: string;
    caption: string;
    query: DocumentNode;
    variables?: AnyVariables;
}