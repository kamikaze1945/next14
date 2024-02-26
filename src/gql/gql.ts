/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    categories {\n      slug\n      name\n    }\n    collections {\n      name\n      slug\n    }\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    slug\n    products {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetByPage($take: Int!, $skip: Int!) {\n  products(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n      categories {\n        slug\n        name\n      }\n      collections {\n        name\n        slug\n      }\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetByPageDocument,
    "query ProductsGetList {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetListDocument,
    "fragment ProductsList on Query {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsListFragmentDoc,
    "fragment ProductsListItem on Product {\n  id\n  name\n  description\n  price\n  images {\n    url\n  }\n  categories {\n    slug\n    name\n  }\n  collections {\n    name\n    slug\n  }\n}": types.ProductsListItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    categories {\n      slug\n      name\n    }\n    collections {\n      name\n      slug\n    }\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductsListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    slug\n    products {\n      ...ProductsListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByPage($take: Int!, $skip: Int!) {\n  products(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n      categories {\n        slug\n        name\n      }\n      collections {\n        name\n        slug\n      }\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByPageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductsList on Query {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsListFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductsListItem on Product {\n  id\n  name\n  description\n  price\n  images {\n    url\n  }\n  categories {\n    slug\n    name\n  }\n  collections {\n    name\n    slug\n  }\n}"): typeof import('./graphql').ProductsListItemFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
