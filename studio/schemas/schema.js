// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import siteSettings from './documents/siteSettings'
import player from './documents/player'
import season from './documents/season'
import match from './documents/match'

// Object types
import playerReference from './objects/playerReference'
import seasonReference from './objects/seasonReference'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'league',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    playerReference,
    player,
    season,
    seasonReference,
    match
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
