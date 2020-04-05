const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  scalar Timestamp

  type User {
    screen_name: String
    location: String
    url: String
    time_zone: String
    geo_enabled: Boolean
    verified: Boolean
    statuses_count: Int
    lang: String
  }

  type Tweet {
    created_at: Timestamp
    id: String!
    text: String
    geo: [Int]
    coordinates: [Int]
    place: [Int]
    possibly_sensitive: Boolean
    lang: String
  }

  type Symbol {
    id: String!
    text: String
  }

  type Url {
    id: String!
    url: String
  }

  type Hashtag {
    id: String!
    text: String
  }

  type Attack {
  
  }

  type Bombing {
  
  }
  
  type Gunshot {
  
  }

  type Ied {
  
  }

  type Event {
  
  }
`;
