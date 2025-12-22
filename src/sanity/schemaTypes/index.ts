import { type SchemaTypeDefinition } from 'sanity'
import { videoType } from './video'
import { resourceType } from './resource'
import { liveClassType } from './liveClass'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [videoType, resourceType, liveClassType],
}
