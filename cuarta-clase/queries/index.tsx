export const SingleCharacterQuery = `
query ($characterId: ID!) {
  character(id: $characterId) {
    id
    name
    status
    species
    type
    gender
    origin {
      name
    }
    location {
      name
    }
    image
    episode {
      id
      name
    }
  }
}
`;

export const SingleEpisodeQuery = `
query ($episodeId: ID!) {
  episode(id:$episodeId){
    id
    name
    characters{
      id
      name
      image
    }
    episode
    air_date
  }
}
`;

export const RandomCharactersQuery = `
query ($randomCharactersIds: [ID!]!) {
  charactersByIds(ids: $randomCharactersIds) {
    id
    image
    name
    status
    species
    location {
      name
    }
    episode {
      name
    }
  }
}
`;
