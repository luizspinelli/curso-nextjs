import { GetServerSideProps } from 'next'
import Link from 'next/link'
import {Title} from '@/styles/Pages/Home'
import SEO from '@/components/SEO'
import { client } from '@/lib/primisc'
import Prismic from 'prismic-javascript'
import PrismicDom from 'prismic-dom'
import {Document} from 'prismic-javascript/types/documents'

interface HomeProps {
  recommendedProducts: Document[]
}


export default function Home({recommendedProducts}: HomeProps) {

  

  return (
    <div>
      <SEO title="Home" description="Best DevECommerceEver" image="boost.png"/>
      <section>
      <Title>Products</Title>
      <ul>
        {recommendedProducts.map(recommendedProduct => {
          return (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDom.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type','product')
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
