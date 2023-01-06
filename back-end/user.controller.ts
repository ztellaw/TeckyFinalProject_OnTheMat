import express from "express";
import { decodeBearerJWT } from "./JWT";
import { UserService } from "./user.service";
export class UserController {
  constructor(private userService: UserService) {}

  register = async (req: express.Request, res: express.Response) => {
    try {
      let { email, username, password, gender } = req.body;

      if (!email) {
        return res.status(400).json({ messages: "email is wrong" });
      }

      if (username.length < 4) {
        return res.status(400).json({ messages: "username is too short" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ messages: "password must be more than 8" });
      }

      if (!gender) {
        return res
          .status(400)
          .json({ messages: "gender must be male, female,other" });
      }

      let result = await this.userService.register(
        email,
        username,
        password,
        gender
      );
      if (result.messages) {
        return res.status(400).json(result);
      }
      return res.status(200).json(result);
    } catch (error) {
      return { error };
    }
  };

  login = async (req: express.Request, res: express.Response) => {
    try {
      let { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ messages: "email is wrong" });
      }

      if (!password) {
        return res.status(400).json({ messages: "password is wrong" });
      }

      let result = await this.userService.login(email, password);

      if (result.messages) {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return { error };
    }
  };

  changePassword = async (req: express.Request, res: express.Response) => {
    try {
      let { email, username, newPassword } = req.body;
      if (!email) {
        return res.status(400).json({ messages: "email cannot be null" });
      }
      if (!username) {
        return res.status(400).json({ messages: "username cannot be null" });
      }
      if (!newPassword) {
        return res.status(400).json({ messages: "password cannot be null" });
      }
      let result = await this.userService.changePassword(
        email,
        username,
        newPassword
      );
      if (result.messages) {
        return res.status(400).json(result);
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ errors: error });
    }
  };

  googleLogin = async (req: express.Request, res: express.Response) => {
    try {
      let { accessToken } = req.body;
      console.log(accessToken);

      // let result = await this.userService.googleLogin(email, username, idToken);

      let result = await this.userService.googleLogin(accessToken);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ messages: error });
    }
  };

  getComment = async (req: express.Request, res: express.Response) => {
    try {
      let payload = decodeBearerJWT(req);
      let result = await this.userService.getComment(payload.id);

      return res.status(200).json(result);
    } catch (error) {
      return { error };
    }
  };

  submitComment = async (req: express.Request, res: express.Response) => {
    try {
      if (!req.body) {
        return res
          .status(400)
          .json({ messages: "Cannot receive comment and review" });
      }
      let { comment, review } = req.body;
      if (comment.length < 5) {
        return res
          .status(400)
          .json({ messages: "Comment should be more than 5 letter" });
      }

      if (typeof review !== "number" || 0 > review || review > 6) {
        return res
          .status(400)
          .json({ messages: "Please insert correct number" });
      }

      let payload = decodeBearerJWT(req);
      let user_id = payload.id;
      let result = await this.userService.submitComment(
        user_id,
        comment,
        review
      );

      return res.status(200).json(result);
    } catch (error) {
      return { error };
    }
  };

  getUserInformation = async (req: express.Request, res: express.Response) => {
    try {
      let payload = decodeBearerJWT(req);
      let user_id = payload.id;
      let result = await this.userService.getUserInformation(user_id);

      return res.status(200).json(result);
    } catch (error) {
      return error;
    }
  };

  changeUserInformation = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      let payload = decodeBearerJWT(req);
      let { email, username, gender } = req.body;
      if (!email.includes("@")) {
        return res.status(401).json({ messages: "email format is wrong" });
      }
      if (username.length < 8) {
        return res
          .status(401)
          .json({ messages: "username's length should be more than 8" });
      }
      let user_id = payload.id;
      let result = await this.userService.changeUserInformation(
        user_id,
        email,
        username,
        gender
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ messages: error });
    }
  };
}
