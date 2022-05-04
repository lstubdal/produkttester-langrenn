
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import test from './documents/test'
import skipair from './documents/skipair'

export default createSchema({
  name: 'default',

  types: schemaTypes.concat([
    test,
    skipair
  ]),
})
