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
    "mutation CartAddProduct($id: ID!, $productId: String!, $quantity: Int!) {\n  cartAddItem(\n    id: $id\n    input: {item: {productId: $productId, quantity: $quantity}}\n  ) {\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}": types.CartAddProductDocument,
    "mutation CardCreate($id: ID, $productId: String!, $quantity: Int!) {\n  cartFindOrCreate(\n    input: {items: {productId: $productId, quantity: $quantity}}\n    id: $id\n  ) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}": types.CardCreateDocument,
    "mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}": types.CartChangeItemQuantityDocument,
    "query CartGetById($id: ID!) {\n  cart(id: $id) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    categories {\n      slug\n      name\n    }\n    collections {\n      name\n      slug\n    }\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    slug\n    description\n    products {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetByPage($take: Int!, $skip: Int!) {\n  products(take: $take, skip: $skip) {\n    data {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n      categories {\n        slug\n        name\n      }\n      collections {\n        name\n        slug\n      }\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetByPageDocument,
    "query ProductsGetList {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetSearchByTerm($searchTearm: String) {\n  products(search: $searchTearm) {\n    data {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n      categories {\n        slug\n        name\n      }\n      collections {\n        name\n        slug\n      }\n    }\n  }\n}": types.ProductsGetSearchByTermDocument,
    "fragment ProductsList on Query {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsListFragmentDoc,
    "fragment ProductsListItem on Product {\n  id\n  name\n  description\n  price\n  images {\n    url\n  }\n  categories {\n    slug\n    name\n  }\n  collections {\n    name\n    slug\n  }\n}": types.ProductsListItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($id: ID!, $productId: String!, $quantity: Int!) {\n  cartAddItem(\n    id: $id\n    input: {item: {productId: $productId, quantity: $quantity}}\n  ) {\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CardCreate($id: ID, $productId: String!, $quantity: Int!) {\n  cartFindOrCreate(\n    input: {items: {productId: $productId, quantity: $quantity}}\n    id: $id\n  ) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CardCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartChangeItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  cart(id: $id) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
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
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    slug\n    description\n    products {\n      ...ProductsListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
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
export function graphql(source: "query ProductsGetSearchByTerm($searchTearm: String) {\n  products(search: $searchTearm) {\n    data {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n      categories {\n        slug\n        name\n      }\n      collections {\n        name\n        slug\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetSearchByTermDocument;
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
