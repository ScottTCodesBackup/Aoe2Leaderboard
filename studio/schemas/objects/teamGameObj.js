export default {
  name: 'teamGameObj',
  type: 'array',
  of: [{
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'name'
        }
      ]
    }]
  }]
}
