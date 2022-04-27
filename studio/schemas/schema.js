
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import project from './documents/project'

export default createSchema({
  name: 'default',

  types: schemaTypes.concat([
    project
  ]),
})
