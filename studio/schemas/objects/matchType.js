// 1. Import the TimeInput react component
import matchSelector from '../../components/matchSelector'

export default {
  name: 'matchType',
  title: 'Match Type',
  type: 'object',
  inputComponent: matchSelector,
  fields: [
    {
      type: 'twoPlayer',
      title: '1v1',
      name: 'twoPlayer'
    },
    {
      type: 'teamGame',
      title: 'Team Game',
      name: 'teamGame'
    },
    {
      type: 'freeForAll',
      title: 'Free for all',
      name: 'freeForAll'
    }
  ],
  preview: {
    select: {
      matchType: 'matchType'
    },
    prepare ({matchType}) {
      return {
        title: matchType,
        subtitle: `${matchType}`
      }
    }
  }
}
