import { Knex } from "knex";
import { checkPassword, hashPassword } from "./hash";
import { encodedJWT, JWTPayload } from "./JWT";
import { admin } from "./server";
// import { defaultApp } from "./server";

export class UserService {
  constructor(private knex: Knex) {}
  async register(
    email: string,
    username: string,
    password: string,
    gender: string
  ) {
    let checkUserisExist = await this.knex
      .select("email")
      .from("user")
      .where("email", email)
      .first();
    if (checkUserisExist.length != 0) {
      return { messages: "user already exists" };
    }

    let hashedpassword = await hashPassword(password);

    await this.knex
      .insert({
        email: email,
        username: username,
        password: hashedpassword,
        gender: gender,
      })
      .into("user");
    return { success: "register is successful" };
  }

  async login(email: string, password: string) {
    console.log(email);
    try {
      let userInformation = await this.knex
        .select("id", "password", "username")
        .from("user")
        .where("email", email)
        .first();

      if (userInformation.length == 0) {
        return { messages: "user not found" };
      }

      let hashedPassword = await userInformation.password;

      let comparePassword = checkPassword(password, hashedPassword);

      if ((await comparePassword) == false) {
        return { messages: "password is wrong" };
      }

      let payload: JWTPayload = {
        id: userInformation.id,
        email: email,
        username: userInformation.username,
      };

      let token = encodedJWT(payload);

      return { token: token };
    } catch (error) {
      console.log(error);

      return { message: "" };
    }
  }

  async changePassword(email: string, username: string, newPassword: string) {
    let userInformation = await this.knex
      .select("id", "password")
      .from("user")
      .where({ email: email, username: username })
      .first();

    if (userInformation.rows.length == 0) {
      return { messages: "user not found" };
    }

    let confirmPassword = await checkPassword(
      newPassword,
      userInformation.password
    );

    if (confirmPassword == true) {
      return {
        messages: "you already use this password, please insert new password",
      };
    }

    let hashedPassword = await hashPassword(newPassword);

    await this.knex
      .update({
        password: hashedPassword,
      })
      .where("id", userInformation.id);

    return { success: "password changed" };
  }

  async googleLogin(accessToken: string) {
    try {
      let results = await admin.auth().verifyIdToken(accessToken);

      console.log(results);
      console.log("name", results.name);
      console.log("email", results.email);
      let addUserInformation = await this.knex
        .select("email")
        .from("user")
        .where({ email: results.email });

      if (addUserInformation.length != 0) {
        await this.knex
          .insert({
            email: results.email,
            username: results.name,
          })
          .into("user");
      }
      return { success: "Login successful!" };
    } catch (error) {
      console.log(error);

      return { error };
    }
  }

  async getComment(user_id: number) {
    let event = await this.knex
      .select("username")
      .from("user")
      .where({ id: user_id })
      .first();

    let username = event.username;

    let commentInformation = await this.knex
      .join("users", "users_id", "comment.user_id")
      .select(
        "users.username" as "username",
        "comment.comment" as "comment",
        "comment.id" as "id",
        "comment.review" as "review"
      )
      .from("comment");

    return { commentInformation, username };
  }
  async submitComment(user_id: number, comment: string, review: number) {
    await this.knex
      .insert({
        user_id: user_id,
        comment: comment,
        review: review,
      })
      .into("comment");
    return { success: "comment is inserted" };
  }

  async getUserInformation(user_id: number) {
    try {
      let res = await this.knex
        .select("id", "username", "email", "gender")
        .from("user")
        .where("id", user_id);
      return res;
    } catch (error) {
      return error;
    }
  }

  async changeUserInformation(
    user_id: number,
    email: string,
    username: string,
    gender: string
  ) {
    let userExist = await this.knex
      .select("id")
      .from("user")
      .where("id", user_id)
      .first();
    if (userExist.length == 0) {
      return { messages: "user is not exist" };
    }
    await this.knex
      .insert({
        email: email,
        username: username,
        gender: gender,
      })
      .into("user");
    return { success: "Change information successful" };
  }
}
