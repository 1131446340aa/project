import Api from './index2'


const run = async () => {
  const { dat } = await Api.GETApiPortalCategories({ a: 3 })
  // dat[0].name
}