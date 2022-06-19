import React from "react"
import { graphql } from "gatsby"
import MyHelmet from "../components/MyHelmet"
import ContactPageTemplate from "./components/ContactPageTemplate"

function ContactPage({ data }) {
  const { title, subheading, heading, contactform, office} = data.markdownRemark.frontmatter

  return (
    <>
      <MyHelmet title={title} description={subheading} />
      <ContactPageTemplate
        heading={heading}
        subheading={subheading}
        contactform={contactform}
        office={office}
      />
    </>
  )
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        heading
        subheading
        office {
          tagline
          location
          address {
            html
          }
          phone {
            html
          }
          image {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
        contactform {
          heading
          description
          image {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
