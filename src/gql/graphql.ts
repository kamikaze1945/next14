/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: unknown; output: unknown; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
};

export type Cart = {
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CategoryList = {
  data: Array<Category>;
  meta: ListMeta;
};

export type Collection = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CollectionList = {
  data: Array<Collection>;
  meta: ListMeta;
};

export type ListMeta = {
  /** The total number of items matching the query */
  count: Scalars['Int']['output'];
  /** The total number of items in the database */
  total: Scalars['Int']['output'];
};

export type Mutation = {
  cartAddItem: Cart;
  cartChangeItemQuantity: Cart;
  cartComplete: Order;
  cartFindOrCreate: Cart;
  cartRemoveItem: Cart;
  reviewCreate: Cart;
};


export type MutationCartAddItemArgs = {
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
};


export type MutationCartChangeItemQuantityArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartCompleteArgs = {
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationCartFindOrCreateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MutationCartFindOrCreateInput;
};


export type MutationCartRemoveItemArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationReviewCreateArgs = {
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationCartAddItemInput = {
  item: CartItemInput;
};

export type MutationCartFindOrCreateInput = {
  items?: InputMaybe<Array<CartItemInput>>;
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lines: Scalars['JSON']['output'];
  status: OrderStatus;
  totalAmount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = {
  data: Array<Order>;
  meta: ListMeta;
};

export type OrderSortBy =
  | 'DEFAULT'
  | 'STATUS'
  | 'TOTAL';

export type OrderStatus =
  | 'CANCELLED'
  | 'CREATED'
  | 'FULFILLED'
  | 'PAID';

export type Product = {
  categories: Array<Category>;
  collections: Array<Collection>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
};

export type ProductImage = {
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta: ListMeta;
};

export type ProductSortBy =
  | 'DEFAULT'
  | 'NAME'
  | 'PRICE'
  | 'RATING';

export type Query = {
  cart?: Maybe<Cart>;
  categories: CategoryList;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections: CollectionList;
  order?: Maybe<Order>;
  orders: OrderList;
  product?: Maybe<Product>;
  products: ProductList;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  email: Scalars['String']['input'];
  order?: SortDirection;
  orderBy?: OrderSortBy;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type Review = {
  author: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewList = {
  data: Array<Review>;
  meta: ListMeta;
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type CardCreateMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  input: CartItemInput;
}>;


export type CardCreateMutation = { cartFindOrCreate: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, price: number, images: Array<{ alt: string, url: string }> } }> } };

export type CartAddProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartAddProductMutation = { cartAddItem: { items: Array<{ quantity: number, product: { id: string, name: string, price: number, images: Array<{ alt: string, url: string }> } }> } };

export type CartChangeItemQuantityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartChangeItemQuantityMutation = { cartChangeItemQuantity: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, price: number, images: Array<{ alt: string, url: string }> } }> } };

export type CartGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CartGetByIdQuery = { cart?: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, price: number, images: Array<{ alt: string, url: string }> } }> } | null };

export type CartRemoveProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type CartRemoveProductMutation = { cartRemoveItem: { id: string, items: Array<{ product: { id: string } }> } };

export type ProductGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductGetByIdQuery = { product?: { id: string, name: string, description: string, price: number, images: Array<{ url: string }>, categories: Array<{ slug: string, name: string }>, collections: Array<{ name: string, slug: string }>, reviews: Array<{ id: string, author: string, title: string, description: string, email: string, rating: number, createdAt: unknown, updatedAt: unknown }> } | null };

export type ProductsGetByCategorySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductsGetByCategorySlugQuery = { category?: { products: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, images: Array<{ url: string }>, categories: Array<{ slug: string, name: string }>, collections: Array<{ name: string, slug: string }>, reviews: Array<{ id: string, author: string, title: string, description: string, email: string, rating: number }> }> } | null };

export type ProductsGetByCollectionSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductsGetByCollectionSlugQuery = { collection?: { name: string, slug: string, description: string, products: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, images: Array<{ url: string }>, categories: Array<{ slug: string, name: string }>, collections: Array<{ name: string, slug: string }>, reviews: Array<{ id: string, author: string, title: string, description: string, email: string, rating: number }> }> } | null };

export type ProductsGetByPageQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  order?: InputMaybe<SortDirection>;
  orderBy?: InputMaybe<ProductSortBy>;
}>;


export type ProductsGetByPageQuery = { products: { data: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, images: Array<{ url: string }>, categories: Array<{ slug: string, name: string }>, collections: Array<{ name: string, slug: string }>, reviews: Array<{ id: string, author: string, title: string, description: string, email: string, rating: number }> }>, meta: { count: number, total: number } } };

export type ProductsGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsGetListQuery = { products: { data: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, images: Array<{ url: string }>, categories: Array<{ slug: string, name: string }>, collections: Array<{ name: string, slug: string }>, reviews: Array<{ id: string, author: string, title: string, description: string, email: string, rating: number }> }> } };

export type ProductsGetSearchByTermQueryVariables = Exact<{
  searchTearm?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsGetSearchByTermQuery = { products: { data: Array<{ id: string, name: string, description: string, price: number, images: Array<{ url: string }>, categories: Array<{ slug: string, name: string }>, collections: Array<{ name: string, slug: string }>, reviews: Array<{ id: string, author: string, title: string, description: string, email: string, rating: number }> }> } };

export type ProductsListFragment = { products: { data: Array<{ id: string, name: string, description: string, price: number, rating?: number | null, images: Array<{ url: string }>, categories: Array<{ slug: string, name: string }>, collections: Array<{ name: string, slug: string }>, reviews: Array<{ id: string, author: string, title: string, description: string, email: string, rating: number }> }> } };

export type ProductsListItemFragment = { id: string, name: string, description: string, price: number, rating?: number | null, images: Array<{ url: string }>, categories: Array<{ slug: string, name: string }>, collections: Array<{ name: string, slug: string }>, reviews: Array<{ id: string, author: string, title: string, description: string, email: string, rating: number }> };

export type ReviewFragment = { id: string, author: string, title: string, description: string, rating: number, email: string };

export type ReviewCreateMutationVariables = Exact<{
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}>;


export type ReviewCreateMutation = { reviewCreate: { id: string } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ProductsListItemFragmentDoc = new TypedDocumentString(`
    fragment ProductsListItem on Product {
  id
  name
  description
  price
  rating
  images {
    url
  }
  categories {
    slug
    name
  }
  collections {
    name
    slug
  }
  reviews {
    id
    author
    title
    description
    email
    rating
  }
}
    `, {"fragmentName":"ProductsListItem"}) as unknown as TypedDocumentString<ProductsListItemFragment, unknown>;
export const ProductsListFragmentDoc = new TypedDocumentString(`
    fragment ProductsList on Query {
  products {
    data {
      ...ProductsListItem
    }
  }
}
    fragment ProductsListItem on Product {
  id
  name
  description
  price
  rating
  images {
    url
  }
  categories {
    slug
    name
  }
  collections {
    name
    slug
  }
  reviews {
    id
    author
    title
    description
    email
    rating
  }
}`, {"fragmentName":"ProductsList"}) as unknown as TypedDocumentString<ProductsListFragment, unknown>;
export const ReviewFragmentDoc = new TypedDocumentString(`
    fragment Review on Review {
  id
  author
  title
  description
  rating
  email
}
    `, {"fragmentName":"Review"}) as unknown as TypedDocumentString<ReviewFragment, unknown>;
export const CardCreateDocument = new TypedDocumentString(`
    mutation CardCreate($id: ID, $input: CartItemInput!) {
  cartFindOrCreate(id: $id, input: {items: [$input]}) {
    id
    items {
      quantity
      product {
        id
        name
        price
        images {
          alt
          url
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CardCreateMutation, CardCreateMutationVariables>;
export const CartAddProductDocument = new TypedDocumentString(`
    mutation CartAddProduct($id: ID!, $productId: String!, $quantity: Int!) {
  cartAddItem(
    id: $id
    input: {item: {productId: $productId, quantity: $quantity}}
  ) {
    items {
      quantity
      product {
        id
        name
        price
        images {
          alt
          url
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartAddProductMutation, CartAddProductMutationVariables>;
export const CartChangeItemQuantityDocument = new TypedDocumentString(`
    mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {
  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {
    id
    items {
      quantity
      product {
        id
        name
        price
        images {
          alt
          url
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartChangeItemQuantityMutation, CartChangeItemQuantityMutationVariables>;
export const CartGetByIdDocument = new TypedDocumentString(`
    query CartGetById($id: ID!) {
  cart(id: $id) {
    id
    items {
      quantity
      product {
        id
        name
        price
        images {
          alt
          url
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartGetByIdQuery, CartGetByIdQueryVariables>;
export const CartRemoveProductDocument = new TypedDocumentString(`
    mutation CartRemoveProduct($id: ID!, $productId: ID!) {
  cartRemoveItem(id: $id, productId: $productId) {
    id
    items {
      product {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartRemoveProductMutation, CartRemoveProductMutationVariables>;
export const ProductGetByIdDocument = new TypedDocumentString(`
    query ProductGetById($id: ID!) {
  product(id: $id) {
    id
    name
    description
    price
    images {
      url
    }
    categories {
      slug
      name
    }
    collections {
      name
      slug
    }
    reviews {
      id
      author
      title
      description
      email
      rating
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<ProductGetByIdQuery, ProductGetByIdQueryVariables>;
export const ProductsGetByCategorySlugDocument = new TypedDocumentString(`
    query ProductsGetByCategorySlug($slug: String!) {
  category(slug: $slug) {
    products {
      ...ProductsListItem
    }
  }
}
    fragment ProductsListItem on Product {
  id
  name
  description
  price
  rating
  images {
    url
  }
  categories {
    slug
    name
  }
  collections {
    name
    slug
  }
  reviews {
    id
    author
    title
    description
    email
    rating
  }
}`) as unknown as TypedDocumentString<ProductsGetByCategorySlugQuery, ProductsGetByCategorySlugQueryVariables>;
export const ProductsGetByCollectionSlugDocument = new TypedDocumentString(`
    query ProductsGetByCollectionSlug($slug: String!) {
  collection(slug: $slug) {
    name
    slug
    description
    products {
      ...ProductsListItem
    }
  }
}
    fragment ProductsListItem on Product {
  id
  name
  description
  price
  rating
  images {
    url
  }
  categories {
    slug
    name
  }
  collections {
    name
    slug
  }
  reviews {
    id
    author
    title
    description
    email
    rating
  }
}`) as unknown as TypedDocumentString<ProductsGetByCollectionSlugQuery, ProductsGetByCollectionSlugQueryVariables>;
export const ProductsGetByPageDocument = new TypedDocumentString(`
    query ProductsGetByPage($take: Int!, $skip: Int!, $order: SortDirection, $orderBy: ProductSortBy) {
  products(take: $take, skip: $skip, order: $order, orderBy: $orderBy) {
    data {
      ...ProductsListItem
    }
    meta {
      count
      total
    }
  }
}
    fragment ProductsListItem on Product {
  id
  name
  description
  price
  rating
  images {
    url
  }
  categories {
    slug
    name
  }
  collections {
    name
    slug
  }
  reviews {
    id
    author
    title
    description
    email
    rating
  }
}`) as unknown as TypedDocumentString<ProductsGetByPageQuery, ProductsGetByPageQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList {
  products {
    data {
      ...ProductsListItem
    }
  }
}
    fragment ProductsListItem on Product {
  id
  name
  description
  price
  rating
  images {
    url
  }
  categories {
    slug
    name
  }
  collections {
    name
    slug
  }
  reviews {
    id
    author
    title
    description
    email
    rating
  }
}`) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;
export const ProductsGetSearchByTermDocument = new TypedDocumentString(`
    query ProductsGetSearchByTerm($searchTearm: String) {
  products(search: $searchTearm) {
    data {
      id
      name
      description
      price
      images {
        url
      }
      categories {
        slug
        name
      }
      collections {
        name
        slug
      }
      reviews {
        id
        author
        title
        description
        email
        rating
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ProductsGetSearchByTermQuery, ProductsGetSearchByTermQueryVariables>;
export const ReviewCreateDocument = new TypedDocumentString(`
    mutation ReviewCreate($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {
  reviewCreate(
    author: $author
    description: $description
    email: $email
    productId: $productId
    rating: $rating
    title: $title
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<ReviewCreateMutation, ReviewCreateMutationVariables>;