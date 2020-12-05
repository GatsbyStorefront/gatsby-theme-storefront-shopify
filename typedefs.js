const typeDefs = `
    type SiteSiteMetadataGatsbyStorefrontConfig {
      storeName: String
      storeDescription: String
      email: String
      company: String
      location: String
      address: String
      phone: String
      workingDays: String
      workingHours: String
      socialNetworks: [String]
      payments: [String]
      shareButtons: [String]
      googleAnalyticsId: String
      isShopifyLite: Boolean
      mainPage: [SiteSiteMetadataGatsbyStorefrontConfigMainPage]
      menu: [SiteSiteMetadataGatsbyStorefrontConfigMenu]
      footerLinks: [SiteSiteMetadataGatsbyStorefrontConfigFooterLinks]
      locales: String
      currency: String
      productsPerCollectionPage: String
      articlesPerBlogPage: String
      logo: SiteSiteMetadataGatsbyStorefrontConfigLogo
      productImagesCarouselProps: SiteSiteMetadataGatsbyStorefrontConfigProductImagesCarouselProps
    }
    type SiteSiteMetadataGatsbyStorefrontConfigMainPage {
      type: String
      isExpanded: Boolean
      children: [SiteSiteMetadataGatsbyStorefrontConfigMainPageChildren]
      name: String
      description: String
      limit: Int
      handle: String
      textColor: String
      textBgColor: String
      buttonText: String
      buttonTextColor: String
      buttonBgColor: String
    }
    type SiteSiteMetadataGatsbyStorefrontConfigMainPageChildren {
      type: String
      isExpanded: Boolean
      name: String
      description: String
      limit: Int
      handle: String
      textColor: String
      textBgColor: String
      buttonText: String
      buttonTextColor: String
      buttonBgColor: String
    }
    type SiteSiteMetadataGatsbyStorefrontConfigMenu {
      name: String
      handle: String
      type: String
      link: String
      parentId: Int
      id: Int
    }
    type SiteSiteMetadataGatsbyStorefrontConfigFooterLinks {
      name: String
      link: String
    }
    type SiteSiteMetadataGatsbyStorefrontConfigProductImagesCarouselProps {
      naturalSlideWidth: Int
      naturalSlideHeight: Int
    }
    type SiteSiteMetadataGatsbyStorefrontConfigLogo {
      url: String
      width: String
      height: String
    }
    type ShopifyProductFieldsFirstImage  {
      id: String
      altText: String
      originalSrc: String
      localFile: File 
    }
    type Query {
      allShopifyCollection(filter: ShopifyCollectionFilterInput, sort: ShopifyCollectionSortInput, skip: Int, limit: Int): ShopifyCollectionConnection!
      allShopifyShopPolicy(filter: ShopifyShopPolicyFilterInput, sort: ShopifyShopPolicySortInput, skip: Int, limit: Int): ShopifyShopPolicyConnection!
      allShopifyArticle(filter: ShopifyArticleFilterInput, sort: ShopifyArticleSortInput, skip: Int, limit: Int): ShopifyArticleConnection!
      allShopifyBlog(filter: ShopifyBlogFilterInput, sort: ShopifyBlogSortInput, skip: Int, limit: Int): ShopifyBlogConnection!
    } 
    type ShopifyCollectionConnection {
      nodes: [ShopifyCollection!]!
      distinct(field: ShopifyCollectionFieldsEnum!): [String!]!
      group(skip: Int, limit: Int, field: ShopifyCollectionFieldsEnum!): [ShopifyCollectionGroupConnection!]!
    }
    type ShopifyCollectionGroupConnection {
      totalCount: Int!
      edges: [ShopifyCollectionEdge!]!
      nodes: [ShopifyCollection!]!
      pageInfo: PageInfo!
      field: String!
      fieldValue: String
    }
    type ShopifyCollectionEdge {
      next: ShopifyCollection
      node: ShopifyCollection!
      previous: ShopifyCollection
    }
    type ShopifyCollection implements Node {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      description: String
      descriptionHtml: String
      handle: String
      image: ShopifyCollectionImage
      title: String
      updatedAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date 
      shopifyId: String
      products: [ShopifyProduct]
      fields: ShopifyCollectionFields
    }

    type ShopifyCollectionFields {
      shopifyThemePath: String
    }

    type ShopifyCollectionImage {
      id: String
      src: String
      localFile: File 
    }
    type ShopifyProduct implements Node {
      id: ID!
      internal: Internal!
      availableForSale: Boolean
      createdAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date
      description: String
      descriptionHtml: String
      handle: String
      images: [ShopifyProductImages]
      onlineStoreUrl: String
      priceRange: ShopifyProductPriceRange
      productType: String
      tags: [String]
      title: String
      vendor: String
      shopifyId: String
      variants: [ShopifyProductVariant]
      options: [ShopifyProductOption]
      fields: ShopifyProductFields
      reviewsConnection: [ShopifyProductReviewsConnection]
      cmsConnection: ShopifyProductCmsConnection
    }
    type ShopifyProductFields {
      shopifyThemePath: String
      firstImage: ShopifyProductFieldsFirstImage
      descriptionSections: [ShopifyProductFieldsDescriptionSections]
      shortDescription: String
      withoutShortDescription: String
    }

    type ShopifyProductReviewsConnection implements Node {
      id: ID!
      title: String
      content: String
      score: Int
      votesUp: Int
      votesDown: Int
      createdAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date
      updatedAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date
      sentiment: Float
      productId: String
      name: String
      email: String
      source: String
    }

    type ShopifyProductCmsConnection {
      productId: String
      shortDescription: String
      description: String
      descriptionHtml: String
      descriptionSections: [ShopifyProductCmsConnectionDescriptionSections]
    }

    type ShopifyProductCmsConnectionDescriptionSections {
      title: String
      content: String
      contentHtml: String
      isOpen: Boolean
      orderPriority: Int
    }

    type ShopifyProductFieldsDescriptionSections {
      id: Int
      section: String
      options: ShopifyProductFieldsDescriptionSectionsOptions
    }

    type ShopifyProductFieldsDescriptionSectionsOptions {
      title: String
      isOpen: Boolean
    }

    type ShopifyProductImages {
      id: String
      altText: String
      originalSrc: String
      localFile: File 
    }
    type ShopifyProductPriceRange {
      minVariantPrice: ShopifyProductPriceRangeMinVariantPrice
      maxVariantPrice: ShopifyProductPriceRangeMaxVariantPrice
    }
    type ShopifyProductPriceRangeMinVariantPrice {
      amount: String
      currencyCode: String
    }
    type ShopifyProductPriceRangeMaxVariantPrice {
      amount: String
      currencyCode: String
    }
    type ShopifyProductVariant implements Node {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      availableForSale: Boolean
      compareAtPrice: String
      compareAtPriceV2: ShopifyProductVariantCompareAtPriceV2
      image: ShopifyProductVariantImage
      price: String
      priceV2: ShopifyProductVariantPriceV2
      requiresShipping: Boolean
      selectedOptions: [ShopifyProductVariantSelectedOptions]
      sku: String
      title: String
      weight: Float
      weightUnit: String
      shopifyId: String
    }
    type ShopifyProductVariantCompareAtPriceV2 {
      amount: String
      currencyCode: String
    }
    type ShopifyProductVariantPriceV2 {
      amount: String
      currencyCode: String
    }
    type ShopifyProductVariantSelectedOptions {
      name: String
      value: String
    }
    type ShopifyProductVariantImage {
      altText: String
      id: String
      originalSrc: String
      localFile: File 
    }
    type ShopifyProductOption implements Node {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      name: String
      values: [String]
      shopifyId: String
    }

    type ShopifyShopPolicyConnection {
      nodes: [ShopifyShopPolicy!]!
      distinct(field: ShopifyShopPolicyFieldsEnum!): [String!]!
      group(skip: Int, limit: Int, field: ShopifyShopPolicyFieldsEnum!): [ShopifyShopPolicyGroupConnection!]!
    }
    type ShopifyShopPolicyGroupConnection {
      totalCount: Int!
      edges: [ShopifyShopPolicyEdge!]!
      nodes: [ShopifyShopPolicy!]!
      pageInfo: PageInfo!
      field: String!
      fieldValue: String
    }
    type ShopifyShopPolicyEdge {
      next: ShopifyShopPolicy
      node: ShopifyShopPolicy!
      previous: ShopifyShopPolicy
    }
    type ShopifyShopPolicy implements Node {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      body: String
      title: String
      url: String
      shopifyId: String
      type: String
      fields: ShopifyShopPolicyFields
    }
    type ShopifyShopPolicyFields {
      shopifyThemePath: String
    }

    type ShopifyArticleConnection {
      nodes: [ShopifyArticle!]!
      distinct(field: ShopifyArticleFieldsEnum!): [String!]!
      group(skip: Int, limit: Int, field: ShopifyArticleFieldsEnum!): [ShopifyArticleGroupConnection!]!
    }
    type ShopifyArticleGroupConnection {
      totalCount: Int!
      edges: [ShopifyArticleEdge!]!
      nodes: [ShopifyArticle!]!
      pageInfo: PageInfo!
      field: String!
      fieldValue: String
    }
    type ShopifyArticleEdge {
      next: ShopifyArticle
      node: ShopifyArticle!
      previous: ShopifyArticle
    }
    type ShopifyArticle implements Node {
      id: ID!
      internal: Internal!
      author: ShopifyArticleAuthor
      blog: ShopifyBlog
      publishedAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date
      content: String
      contentHtml: String
      excerpt: String
      excerptHtml: String
      title: String
      url: String
      shopifyId: String
      fields: ShopifyArticleFields
    }
    type ShopifyArticleAuthor {
      email: String
      firstName: String
      lastName: String
      name: String
    }
    type ShopifyArticleFields {
      shopifyThemePath: String
    }

    type ShopifyBlogConnection {
      nodes: [ShopifyBlog!]!
      distinct(field: ShopifyBlogFieldsEnum!): [String!]!
      group(skip: Int, limit: Int, field: ShopifyBlogFieldsEnum!): [ShopifyBlogGroupConnection!]!
    }
    type ShopifyBlogGroupConnection {
      totalCount: Int!
      edges: [ShopifyBlogEdge!]!
      nodes: [ShopifyBlog!]!
      pageInfo: PageInfo!
      field: String!
      fieldValue: String
    }
    type ShopifyBlogEdge {
      next: ShopifyBlog
      node: ShopifyBlog!
      previous: ShopifyBlog
    }
    type ShopifyBlog implements Node {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      title: String
      url: String
      shopifyId: String
      fields: ShopifyBlogFields
    }
    type ShopifyBlogFields {
      shopifyThemePath: String
    }

    type SiteSearchIndex implements Node {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      pages: [String]
      index: SiteSearchIndex_Index
    }

    type ShopifyPage implements Node {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      handle: String
      title: String
      body: String
      bodySummary: String
      url: String
      shopifyId: String
      fields: ShopifyPageFields
    }
    type ShopifyPageFields {
      shopifyThemePath: String
    }


`;

module.exports = typeDefs;
