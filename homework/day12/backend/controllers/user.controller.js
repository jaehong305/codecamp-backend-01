import { checkEmail, getTemplate, sendEmail } from './services/email.js';
import { getOpenGraph } from './services/cheerio.js';
import { User } from '../models/user.model.js';
import { Token } from '../models/token.model.js';

export class UserController {
  getUsers = async function (req, res) {
    const users = await User.find();
    res.send(users);
  };

  postUsers = async function (req, res) {
    const user = req.body.user;
    const { name, email, personal1, personal2, prefer, pwd, phone } = user;
    if (!name || !personal1 || !personal2 || !phone || !prefer || !pwd) {
      res.send('회원정보를 모두 입력해주세요.');
      return;
    }

    // 번호 인증완료 체크
    const myphone = await Token.findOne({ phone });
    if (!myphone || !myphone.isAuth) {
      res.status(422).send('에러!! 핸드폰 번호가 인증되지 않았습니다.');
      return;
    }

    // 1. email이 정상인지 확인(1-존재여부, 2-@포함여부)
    if (checkEmail(email)) {
      const personal = `${personal1}-*******`;
      const og = await getOpenGraph(prefer);
      await new User({
        name,
        email,
        personal,
        prefer,
        pwd,
        phone,
        og: {
          title: og.title,
          description: og.description,
          image: og.image,
        },
      }).save();
      myphone.isAuth = false;
      await myphone.save();

      const me = await User.findOne({ phone });
      res.send(`회원가입이 완료되었습니다. ID${me._id}`);

      // 2. 가입환영 템플릿 만들기
      const template = getTemplate(user);

      // 3. 이메일에 가입환영 템플릿 전송하기(콘솔)
      sendEmail(user, template);
    } else {
      res.send('email형식이 올바르지 않습니다.');
      return;
    }
  };
}
