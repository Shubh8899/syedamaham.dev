import { Text, ContentsTypeTab } from '@/components';
import { CategoryCard } from '@/components/';
import { getCategories } from '@/utils/sanity-utils';
import { Metadata } from "next";
import {WEBSITE_NAME,META_SEO_KEYWORDS} from '@/constants/_APP_SETUP'

export const metadata: Metadata = {
  title:'Categories',
  description: `Explore diverse tech categories with ${WEBSITE_NAME}. From coding to data engineering, uncover insights across a range of topics.`,
  keywords: META_SEO_KEYWORDS,
};



interface Category {
  _id: string;
  title: string;
  slug: {
    [key: string]: string;
  };
  current: string;
  _type: string;
  postCount: number;
}

const Categories = async () => {
  const categories: Category[] = await getCategories();
  return (
    <section className='container px-3 pt-20 md:pb-20 md:pt-10'>
      <div className='mt-19'>
        <ContentsTypeTab />

        <Text
          title
          className='mb-5 mt-10 text-appPurple-100 dark:text-appRed-100'
        >
          Categories 🐈
        </Text>
        <div className='xs:grid-cols-2 grid grid-cols-1 gap-3 pb-4 md:grid-cols-3 lg:grid-cols-4 lg:pb-8'>
          {categories?.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                name={category.title}
                url={category.slug.current}
                total={category.postCount}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;