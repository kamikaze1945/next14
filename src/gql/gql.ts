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
    "mutation CardCreate($id: ID, $input: CartItemInput!) {\n  cartFindOrCreate(id: $id, input: {items: [$input]}) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}": types.CardCreateDocument,
    "mutation CartAddProduct($id: ID!, $productId: String!, $quantity: Int!) {\n  cartAddItem(\n    id: $id\n    input: {item: {productId: $productId, quantity: $quantity}}\n  ) {\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}": types.CartAddProductDocument,
    "mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}": types.CartChangeItemQuantityDocument,
    "query CartGetById($id: ID!) {\n  cart(id: $id) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "mutation CartRemoveProduct($id: ID!, $productId: ID!) {\n  cartRemoveItem(id: $id, productId: $productId) {\n    id\n    items {\n      product {\n        id\n      }\n    }\n  }\n}": types.CartRemoveProductDocument,
    "query OrdersGetByEmail($email: String!) {\n  orders(email: $email, order: ASC, orderBy: DEFAULT) {\n    data {\n      id\n      createdAt\n      totalAmount\n      updatedAt\n      status\n      lines\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.OrdersGetByEmailDocument,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    categories {\n      slug\n      name\n    }\n    collections {\n      name\n      slug\n    }\n    reviews {\n      id\n      author\n      title\n      description\n      email\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    slug\n    description\n    products {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetByPage($take: Int!, $skip: Int!, $order: SortDirection, $orderBy: ProductSortBy) {\n  products(take: $take, skip: $skip, order: $order, orderBy: $orderBy) {\n    data {\n      ...ProductsListItem\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetByPageDocument,
    "query ProductsGetList {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetSearchByTerm($searchTearm: String) {\n  products(search: $searchTearm) {\n    data {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n      categories {\n        slug\n        name\n      }\n      collections {\n        name\n        slug\n      }\n      reviews {\n        id\n        author\n        title\n        description\n        email\n        rating\n      }\n    }\n  }\n}": types.ProductsGetSearchByTermDocument,
    "fragment ProductsList on Query {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}": types.ProductsListFragmentDoc,
    "fragment ProductsListItem on Product {\n  id\n  name\n  description\n  price\n  rating\n  images {\n    url\n  }\n  categories {\n    slug\n    name\n  }\n  collections {\n    name\n    slug\n  }\n  reviews {\n    id\n    author\n    title\n    description\n    email\n    rating\n  }\n}": types.ProductsListItemFragmentDoc,
    "fragment Review on Review {\n  id\n  author\n  title\n  description\n  rating\n  email\n}": types.ReviewFragmentDoc,
    "mutation ReviewCreate($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {\n  reviewCreate(\n    author: $author\n    description: $description\n    email: $email\n    productId: $productId\n    rating: $rating\n    title: $title\n  ) {\n    id\n  }\n}": types.ReviewCreateDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CardCreate($id: ID, $input: CartItemInput!) {\n  cartFindOrCreate(id: $id, input: {items: [$input]}) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CardCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($id: ID!, $productId: String!, $quantity: Int!) {\n  cartAddItem(\n    id: $id\n    input: {item: {productId: $productId, quantity: $quantity}}\n  ) {\n    items {\n      quantity\n      product {\n        id\n        name\n        price\n        images {\n          alt\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
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
export function graphql(source: "mutation CartRemoveProduct($id: ID!, $productId: ID!) {\n  cartRemoveItem(id: $id, productId: $productId) {\n    id\n    items {\n      product {\n        id\n      }\n    }\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByEmail($email: String!) {\n  orders(email: $email, order: ASC, orderBy: DEFAULT) {\n    data {\n      id\n      createdAt\n      totalAmount\n      updatedAt\n      status\n      lines\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    categories {\n      slug\n      name\n    }\n    collections {\n      name\n      slug\n    }\n    reviews {\n      id\n      author\n      title\n      description\n      email\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
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
export function graphql(source: "query ProductsGetByPage($take: Int!, $skip: Int!, $order: SortDirection, $orderBy: ProductSortBy) {\n  products(take: $take, skip: $skip, order: $order, orderBy: $orderBy) {\n    data {\n      ...ProductsListItem\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByPageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetSearchByTerm($searchTearm: String) {\n  products(search: $searchTearm) {\n    data {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n      categories {\n        slug\n        name\n      }\n      collections {\n        name\n        slug\n      }\n      reviews {\n        id\n        author\n        title\n        description\n        email\n        rating\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetSearchByTermDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductsList on Query {\n  products {\n    data {\n      ...ProductsListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsListFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductsListItem on Product {\n  id\n  name\n  description\n  price\n  rating\n  images {\n    url\n  }\n  categories {\n    slug\n    name\n  }\n  collections {\n    name\n    slug\n  }\n  reviews {\n    id\n    author\n    title\n    description\n    email\n    rating\n  }\n}"): typeof import('./graphql').ProductsListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Review on Review {\n  id\n  author\n  title\n  description\n  rating\n  email\n}"): typeof import('./graphql').ReviewFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreate($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {\n  reviewCreate(\n    author: $author\n    description: $description\n    email: $email\n    productId: $productId\n    rating: $rating\n    title: $title\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewCreateDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
