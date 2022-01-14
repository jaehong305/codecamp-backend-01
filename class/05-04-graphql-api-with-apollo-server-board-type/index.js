import { ApolloServer, gql } from 'apollo-server';

// The GraphQL schema
const typeDefs = gql`
  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: BoardReturn => 객체 1개를 의미
    fetchBoards: [BoardReturn] # => 배열안의 객체
  }

  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: (_, args) => {
      // 데이터베이스에서 데이터를 꺼내오는 로직

      return [
        {
          number: 1,
          writer: '철수',
          title: '제목입니다',
          contents: '내용~~',
        },
        {
          number: 2,
          writer: '영희',
          title: '제목?',
          contents: '용~~~~',
        },
        {
          number: 3,
          writer: '훈이',
          title: '제목입니다?????',
          contents: '내~~!!!!!!',
        },
        {
          number: 4,
          writer: '민수',
          title: '제목!!!입니다',
          contents: '내용!!!!!~~',
        },
      ];
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 데이터베이스에 데이터를 저장하는 로직
      console.log(args);
      return '등록에 성공하였습니다.';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
