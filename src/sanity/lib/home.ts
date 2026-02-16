/**
 * Homepage content fetch and types.
 * Used by src/app/page.tsx to render homepage from Sanity.
 */

const HOME_QUERY = `*[_type == "home"][0]{
  _id,
  content[]
}`;

export type HomePage = {
  _id: string;
  content: Array<{
    _type: string;
    _key: string;
    [key: string]: any;
  }>;
};

export { HOME_QUERY };
