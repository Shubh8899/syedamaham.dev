import { groq } from "next-sanity";

// Snippets
export const snippetPathsQuery = groq`*[_type == "snippet" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

export const snippetQuery = groq`*[_type == "snippet" && slug.current == $slug][0]{
    _createdAt,
    _updatedAt,
  title,
  body,
  isSeries,
  tags,
  slug,
  meta_description,
  "tags": tags[]-> {title},
  "author": author -> {name,slug,image,designation,profiles,bio,about},
  "series":series -> {title,slug},
  "category": categories[]-> {title,slug},
  }`;

export const snippetsQuery = groq`*[_type == "snippet"]{
    _createdAt,
    _updatedAt,
  title,
  body,
  isSeries,
  tags,
  slug,
  meta_description,
  "tags": tags[]-> {title},
  "author": author -> {name,slug,image,designation,profiles,bio,about},
  "series":series -> {title,slug},
  "category": categories[]-> {title,slug},
  }`;
  export const getRandomSnippetsQuery = groq`*[_type == "snippet"] | order(_createdAt asc){
    _createdAt,
    title,
    body,
    "author": author -> {name, slug, image},
    meta_description,
    mainImage,
    slug,
    "tags": tags[]-> {title, slug},
    "category": categories[]-> {title, slug},
  }[0..2]`;

export const getRelatedSeriesPostForSinglePostQuery = groq`*[_type == "post" && isSeries == true && series-> slug.current == $slug]{
      _id,_createdAt,
            title,
            body,
            "author": author -> {name,slug,image,designation,profiles,bio,about},
            meta_description,
            mainImage,
            slug,
            "tags": tags[]-> {title,slug},
            "category": categories[]-> {title,slug},
            "series":series-> {title,slug},
    }[0..2]`;
//============================== Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

export const postsQuery = groq`*[_type == "post"]{
    _createdAt,
    _updatedAt,
  title,
  body,
  isSeries,
  tags,
  meta_description,
  mainImage,
  slug,
  "tags": tags[]-> {title},
  "author": author -> {name,slug,image,designation,profiles,bio,about},
  "series":series -> {title,slug},
  "category": categories[]-> {title,slug},
  "numberOfCharacters": length(pt::text(body)),
  "estimatedWordCount": round(length(pt::text(body)) / 5),
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
}`;
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    _createdAt,
    _updatedAt,
  title,
  body,
  isSeries,
  tags,
  meta_description,
  mainImage,
  slug,
  "tags": tags[]-> {title},
  "author": author -> {name,slug,image,designation,profiles,bio,about},
  "series":series -> {title,slug},
  "category": categories[]-> {title,slug},
  "numberOfCharacters": length(pt::text(body)),
  "estimatedWordCount": round(length(pt::text(body)) / 5),
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
}`;
// | order(rand()) [0..2]
export const getRandomPostsQuery = groq`*[_type == "post"] | order(_createdAt asc){
  _createdAt,
  title,
  body,
  "author": author -> {name, slug, image},
  meta_description,
  mainImage,
  slug,
  "tags": tags[]-> {title, slug},
  "category": categories[]-> {title, slug},
  "series": series-> {title, slug}
}[0..2]`;
// ======================== Open Source ================================
export const getOpenSourceQuery = groq`*[_type == "openSource"]`;

// ======================== Tags ================================

export const getTagsQuery = groq`*[_type == "tags"]`;

export const getTagRelatedPostQuery = groq`*[_type == "post" && $slug in tags[]->slug.current]{
      _createdAt,
    title,
    body,
    "author": author -> {name,slug,image,designation,profiles,bio,about},
    meta_description,
    mainImage,
    slug,
    "tags": tags[]-> {title,slug},
    "category": categories[]-> {title,slug},
    "series":series-> {title,slug},
}`;

export const tagsPathsQuery = groq`*[_type == "tags" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;

// ======================== Categories ================================
export const getCategoriesQuery = groq`*[_type == "category"] {
    _id,
    title,
    slug,
    meta_description,
    "postCount": count(*[_type == "post" && references(^._id)]),
  }`;

export const getCategoryRelatedPostQuery = groq`*[_type == "post" && $slug in categories[]->slug.current]{
      _createdAt,
    title,
    body,
    "author": author -> {name,slug,image,designation,profiles,bio,about},
    meta_description,
    mainImage,
    slug,
    "tags": tags[]-> {title,slug},
    "category": categories[]-> {title,slug},
    "series":series-> {title,slug},
}`;

// ======================== Author ================================

export const getAuthorsQuery = groq`*[_type == "author"]{
      name,
      slug,
      image,
      designation,
      profiles,
      bio,
      about,
      meta_description,
  }`;
export const getAuthorQuery = groq`*[_type == "author" && slug.current == $slug]{
      name,slug,image,designation,profiles,bio,about,
      "posts": *[_type == "post" && references(^._id)] {
        _createdAt,
           _updatedAt,
         title,
         body,
         isSeries,
         tags,
         meta_description,
         mainImage,
         slug,
         "tags": tags[]-> {title},
         "author": author -> {name,slug,image,designation,profiles,bio,about},
         "series":series -> {title,slug},
         "category": categories[]-> {title,slug} }
    }[0]`;

export const getAuthorProfilesQuery = groq`*[_type == "author" && slug.current == $slug]{
      profiles,
      name,
      meta_description,
    }[0]`;

export const getAuthorAboutQuery = groq`*[_type == "author" && slug.current == $slug]{
      "body":about,
      name,
      meta_description,
    }[0]`;

// ======================== ExternalArticels ================================

export const getExternalArticelsQuery = groq`*[_type == "externalArticles"]{
      _createdAt,
    title,
    body,
    meta_description,
    mainImage,
    slug,
    "tags": tags[]-> {title,slug},
    }`;
// ======================== Series ================================

export const getSeriesQuery = groq`*[_type == "series"]{
      _createdAt,
    title,
    body,
    "author": author -> {name,slug,image,designation,profiles,bio,about},
    meta_description,
    mainImage,
    slug,
    "tags": tags[]-> {title,slug},
    "category": categories[]-> {title,slug},
    }`;

export const getSeriesRelatedPostQuery = groq`*[_type == "post" && series-> slug.current == $slug] {
      _id,_createdAt,
        title,
        body,
        "author": author -> {name,slug,image,designation,profiles,bio,about},
        meta_description,
        mainImage,
        slug,
        "tags": tags[]-> {title,slug},
        "category": categories[]-> {title,slug},
        "series":series-> {title,slug},
}`;


// ======================== Legals ================================

export const getLegalsQuery = groq`*[_type == "legal"]{
      _createdAt,
      _updatedAt,
    title,
    body,
    meta_description,
    slug,
    }`;

export const getLegalQuery = groq`*[_type == "legal" && slug.current == $slug]{
      _createdAt,
      _updatedAt,
    title,
    body,
    meta_description,
    slug,
    }[0]`;

// ======================== Profile ================================
export const getProfilesQuery = groq`*[_type == "profiles"]{
      _createdAt,
    name,
    url,
    meta_description,
    }`;

// ======================== About ================================

export const getAboutQuery = groq`*[_type == "about"]{
    title,
    body,
    meta_description,
    }`;

// ======================== Contact ================================
export const getContactQuery = groq`*[_type == "contact"]{
    title,
    body,
    meta_description,
    }`;



// getFull details
export const getFullDetailsQuery = groq`*[_type == "post"]`;




