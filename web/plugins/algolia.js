import algoliasearch from 'algoliasearch/lite'

// eslint-disable-next-line require-await
const asd = async (_context, inject) => {
  console.log('algolial loaded')
  const searchClient = algoliasearch(
    'LHCK32RLA0',
    '1a8636814d361ab08f587c197701b674',
  )
  inject('algoliaClient', searchClient)
}

export default asd
