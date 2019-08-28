import S from '@sanity/desk-tool/structure-builder'

const hiddenDocTypes = listItem =>
  !['siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
