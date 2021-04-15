const typeDefs = `
    type SiteSiteMetadataGatsbyStorefrontConfig @infer {
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
    type SiteSiteMetadataGatsbyStorefrontConfigMainPage @infer {
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
    type SiteSiteMetadataGatsbyStorefrontConfigMainPageChildren @infer {
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
    type SiteSiteMetadataGatsbyStorefrontConfigMenu @infer {
      name: String
      handle: String
      type: String
      link: String
      parentId: Int
      id: Int
    }
    type SiteSiteMetadataGatsbyStorefrontConfigFooterLinks @infer {
      name: String
      link: String
    }
    type SiteSiteMetadataGatsbyStorefrontConfigProductImagesCarouselProps @infer {
      naturalSlideWidth: Int
      naturalSlideHeight: Int
    }
    type SiteSiteMetadataGatsbyStorefrontConfigLogo @infer {
      url: String
      width: String
      height: String
    }
    type ShopifyProductFieldsFirstImage  @infer {
      id: String
      altText: String
      originalSrc: String
      localFile: File @link(from: "localFile___NODE")
    }
    type Query @infer {
      allShopifyCollection(filter: ShopifyCollectionFilterInput, sort: ShopifyCollectionSortInput, skip: Int, limit: Int): ShopifyCollectionConnection!
      allShopifyShopPolicy(filter: ShopifyShopPolicyFilterInput, sort: ShopifyShopPolicySortInput, skip: Int, limit: Int): ShopifyShopPolicyConnection!
      allShopifyArticle(filter: ShopifyArticleFilterInput, sort: ShopifyArticleSortInput, skip: Int, limit: Int): ShopifyArticleConnection!
      allShopifyBlog(filter: ShopifyBlogFilterInput, sort: ShopifyBlogSortInput, skip: Int, limit: Int): ShopifyBlogConnection!
    } 
    type ShopifyCollectionConnection @infer {
      nodes: [ShopifyCollection!]!
      distinct(field: ShopifyCollectionFieldsEnum!): [String!]!
      group(skip: Int, limit: Int, field: ShopifyCollectionFieldsEnum!): [ShopifyCollectionGroupConnection!]!
    }
    type ShopifyCollectionGroupConnection @infer {
      totalCount: Int!
      edges: [ShopifyCollectionEdge!]!
      nodes: [ShopifyCollection!]!
      pageInfo: PageInfo!
      field: String!
      fieldValue: String
    }
    type ShopifyCollectionEdge @infer {
      next: ShopifyCollection
      node: ShopifyCollection!
      previous: ShopifyCollection
    }
    type ShopifyCollection implements Node @infer@infer {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      description: String
      descriptionHtml: String
      handle: String
      image: ShopifyCollectionImage 
      title: String
      updatedAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date @dateformat
      shopifyId: String
      products: [ShopifyProduct] @link(from: "products___NODE")
      fields: ShopifyCollectionFields 
    }

    type ShopifyCollectionFields @infer {
      shopifyThemePath: String
    }

    type ShopifyCollectionImage @infer {
      id: String
      src: String
      localFile: File @link
    }
    type ShopifyProduct implements Node @infer@infer {
      id: ID!
      internal: Internal!
      availableForSale: Boolean
      createdAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date @dateformat
      description: String
      descriptionHtml: String
      handle: String
      #images: [ShopifyProductImages] @link(from: "images.localFile___NODE")
      onlineStoreUrl: String
      priceRange: ShopifyProductPriceRange
      productType: String
      tags: [String]
      title: String
      vendor: String
      shopifyId: String
      variants: [ShopifyProductVariant] @link(from: "variants___NODE")
      options: [ShopifyProductOption] @link(from: "options___NODE")
      fields: ShopifyProductFields
      reviewsConnection: [ShopifyProductReviewsConnection] @link(from: "reviewsConnection___NODE")
      cmsConnection: ShopifyProductCmsConnection
    }
    type ShopifyProductFields @infer {
      shopifyThemePath: String
      firstImage: ShopifyProductFieldsFirstImage
      descriptionSections: [ShopifyProductFieldsDescriptionSections]
      shortDescription: String
      withoutShortDescription: String
    }

    type ShopifyProductReviewsConnection implements Node @infer {
      id: ID!
      title: String
      content: String
      score: Int
      votesUp: Int
      votesDown: Int
      createdAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date @dateformat
      updatedAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date @dateformat
      sentiment: Float
      productId: String
      name: String
      email: String
      source: String
    }

    type ShopifyProductCmsConnectionDescriptionSections @infer {
      id: ID!
      title: String
      content: String
      contentHtml: String
      isOpen: Boolean
      orderPriority: Int
    }

    type ShopifyProductCmsConnection @infer {
      productId: String
      shortDescription: String
      description: String
      descriptionHtml: String
      descriptionSections: [ShopifyProductCmsConnectionDescriptionSections] 
    }

    type ShopifyProductFieldsDescriptionSections @infer {
      id: Int
      section: String
      options: ShopifyProductFieldsDescriptionSectionsOptions
    }

    type ShopifyProductFieldsDescriptionSectionsOptions @infer {
      title: String
      isOpen: Boolean
    }

    #type ShopifyProductImages @infer {
    #  id: String
    #  altText: String
    #  originalSrc: String
    #  localFile: File @link
    #}

    type ShopifyProductPriceRange @infer {
      minVariantPrice: ShopifyProductPriceRangeMinVariantPrice
      maxVariantPrice: ShopifyProductPriceRangeMaxVariantPrice
    }
    type ShopifyProductPriceRangeMinVariantPrice @infer {
      amount: String
      currencyCode: String
    }
    type ShopifyProductPriceRangeMaxVariantPrice @infer {
      amount: String
      currencyCode: String
    }
    type ShopifyProductVariant implements Node @infer {
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
    type ShopifyProductVariantCompareAtPriceV2 @infer {
      amount: String
      currencyCode: String
    }
    type ShopifyProductVariantPriceV2 @infer {
      amount: String
      currencyCode: String
    }
    type ShopifyProductVariantSelectedOptions @infer {
      name: String
      value: String
    }
    type ShopifyProductVariantImage @infer {
      altText: String
      id: String
      originalSrc: String
      localFile: File @link
    }
    type ShopifyProductOption implements Node @infer {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      name: String
      values: [String]
      shopifyId: String
    }

    type ShopifyShopPolicyConnection @infer {
      nodes: [ShopifyShopPolicy!]!
      distinct(field: ShopifyShopPolicyFieldsEnum!): [String!]!
      group(skip: Int, limit: Int, field: ShopifyShopPolicyFieldsEnum!): [ShopifyShopPolicyGroupConnection!]!
    }
    type ShopifyShopPolicyGroupConnection @infer {
      totalCount: Int!
      edges: [ShopifyShopPolicyEdge!]!
      nodes: [ShopifyShopPolicy!]!
      pageInfo: PageInfo!
      field: String!
      fieldValue: String
    }
    type ShopifyShopPolicyEdge @infer {
      next: ShopifyShopPolicy
      node: ShopifyShopPolicy!
      previous: ShopifyShopPolicy
    }
    type ShopifyShopPolicy implements Node @infer {
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
    type ShopifyShopPolicyFields @infer {
      shopifyThemePath: String
    }

    type ShopifyArticleConnection @infer {
      nodes: [ShopifyArticle!]!
      distinct(field: ShopifyArticleFieldsEnum!): [String!]!
      group(skip: Int, limit: Int, field: ShopifyArticleFieldsEnum!): [ShopifyArticleGroupConnection!]!
    }
    type ShopifyArticleGroupConnection @infer {
      totalCount: Int!
      edges: [ShopifyArticleEdge!]!
      nodes: [ShopifyArticle!]!
      pageInfo: PageInfo!
      field: String!
      fieldValue: String
    }
    type ShopifyArticleEdge @infer {
      next: ShopifyArticle
      node: ShopifyArticle!
      previous: ShopifyArticle
    }
    type ShopifyArticle implements Node @infer {
      id: ID!
      internal: Internal!
      author: ShopifyArticleAuthor
      blog: ShopifyBlog
      publishedAt(formatString: String, fromNow: Boolean, difference: String, locale: String): Date @dateformat
      content: String
      contentHtml: String
      excerpt: String
      excerptHtml: String
      title: String
      url: String
      shopifyId: String
      fields: ShopifyArticleFields
    }
    type ShopifyArticleAuthor @infer {
      email: String
      firstName: String
      lastName: String
      name: String
    }
    type ShopifyArticleFields @infer {
      shopifyThemePath: String
    }

    type ShopifyBlogConnection @infer {
      nodes: [ShopifyBlog!]!
      distinct(field: ShopifyBlogFieldsEnum!): [String!]!
      group(skip: Int, limit: Int, field: ShopifyBlogFieldsEnum!): [ShopifyBlogGroupConnection!]!
    }
    type ShopifyBlogGroupConnection @infer {
      totalCount: Int!
      edges: [ShopifyBlogEdge!]!
      nodes: [ShopifyBlog!]!
      pageInfo: PageInfo!
      field: String!
      fieldValue: String
    }
    type ShopifyBlogEdge @infer {
      next: ShopifyBlog
      node: ShopifyBlog!
      previous: ShopifyBlog
    }
    type ShopifyBlog implements Node @infer {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      title: String
      url: String
      shopifyId: String
      fields: ShopifyBlogFields
    }
    type ShopifyBlogFields @infer {
      shopifyThemePath: String
    }

    type SiteSearchIndex implements Node @infer {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      pages: [String]
      index: SiteSearchIndex_Index
    }

    type ShopifyPage implements Node @infer {
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
    type ShopifyPageFields @infer {
      shopifyThemePath: String
    }


`;

module.exports = typeDefs;
