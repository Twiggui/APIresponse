import Joi from "joi";

const schema = Joi.object({
  firstnameValidator: Joi.string().max(50).required(),
  lastnameValidator: Joi.string().max(50).required(),
  emailValidator: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ),
  passwordValidator: Joi.string()
    .required()
    .pattern(
      new RegExp(/^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
    ),
  password_confirmationValidator: Joi.ref("passwordValidator"),
}).with("password", "password_confirmation");

export default async (req: any, res: any, next: any) => {
  const {
    lastname,
    firstname,
    email,
    password,
    password_confirmation,
  } = req.body;

  try {
    await schema.validateAsync({
      lastnameValidator: lastname,
      firstnameValidator: firstname,
      emailValidator: email,
      passwordValidator: password,
      password_confirmationValidator: password_confirmation,
    });
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ errorMessage: err });
  }
};
