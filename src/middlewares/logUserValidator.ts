import Joi from "joi";

const schema = Joi.object({
  emailValidator: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ),
  passwordValidator: Joi.string()
    .required()
    .pattern(new RegExp(/^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)),
});

export default async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  try {
    await schema.validateAsync({
      emailValidator: email,
      passwordValidator: password,
    });
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ errorMessage: err });
  }
};
