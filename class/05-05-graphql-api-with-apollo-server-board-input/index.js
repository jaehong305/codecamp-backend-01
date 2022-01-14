import { ApolloServer, gql } from 'apollo-server';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';

// The GraphQL schema
const typeDefs = gql`
  type BoardReturn { # 리턴받는 타입을 의미
    number: Int
    writer: String
    title: String
    contents: String
  }

  input CreateBoardInput { # 입력하는 인풋타입을 의미
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: BoardReturn => 객체 1개를 의미
    fetchBoards: [BoardReturn] # => 배열안에 객체 1개 이상
  }

  type Mutation {
    createBoard(createBoardInput: CreateBoardInput!): String
    createTokenOfPhone(myphoneInput: String!): String
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

    createTokenOfPhone: (_, args) => {
      if (checkValidationPhone(args.myphoneInput)) {
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken(4);

        // 3. 핸드폰번호에 토큰 전송하기
        return sendTokenToSMS(args.myphoneInput, mytoken);
      } else {
        return;
      }
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
