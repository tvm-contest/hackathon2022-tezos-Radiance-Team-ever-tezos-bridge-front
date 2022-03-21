import {DocumentNode} from "graphql";

export default function getGqlString(doc: DocumentNode): string {
  return (doc.loc && doc.loc.source.body) || "{}";
}
