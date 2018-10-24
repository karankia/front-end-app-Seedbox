// TODO: define the url in some config.
const url = 'http://api.tvmaze.com/people/1/castcredits'

class RestService {
  async getCharacterNames() {
    const res = await fetch(url)
    if (!res.ok) return []

    const cast = await res.json()
    const charNames = []
    for (const key in cast) {
      const c = cast[key]
      const link = c._links.character.href
      const nameRes = await fetch(link)
      if (nameRes.ok) {
        const charObj = await nameRes.json()
        console.log(charObj.name)
        charNames.push(charObj.name)
      }
    }

    return charNames
  }
}

export { RestService }