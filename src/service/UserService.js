import connection from "../db/DatabaseConfig";
import ValidationService from "./ValidationService.js";
import { UserError } from "../errors/Errors.js";

class UserService {
  async findUserById(id) {
    const query = "SELECT * FROM user where user.id = ?";

    const [user] = await connection.execute(query, id);

    if (result == null) {
      throw new UserError("Usuário não encontrado!", 404);
    }

    return user;
  }

  async createUser(name, email, password) {
    ValidationService.validatePasswordAndEmail(email, password);

    await this.verifyEmailAlreadyExist(email);

    const encryptPass = await bcrypt.hash(password, 10);

    const query = "INSERT INTO user (name, email, password) values (?,?,?)";

    const [rows] = await connection.execute(query, name, email, encryptPass);

    if (rows <= 0) {
      throw new UserError("Não foi possível criar o usuário!", 404);
    }

    const user = await this.findUserById(rows.insertId);

    return user;
  }

  async updateUser(id, name, email, password) {
    const user = await this.findUserById(id);

    ValidationService.validatePasswordAndEmail(email, password);

    await this.verifyEmailAlreadyExist(email);

    const encryptPass = await bcrypt.hash(password, 10);

    const query = "UPDATE user SET name = ? email = ? password = ? where user.id = ?";

    const [rows] = await connection.execute(query, name, email, encryptPass, id);

    if (rows <= 0) {
      throw new UserError("Não foi possível criar o usuário!", 404);
    }

    return user;
  }

  async deleteUserById(id) {
    const query = "DELETE user where user.id = ?";

    const [user] = await connection.execute(query, id);

    if (result == null) {
      throw new UserError("Usuário não encontrado!", 404);
    }

    return user;
  }

  async login(email, password) {
    const user = await this.findByEmail(email);
    const isValidatedPassword = await bcrypt.compare(password, user.password);

    if (!isValidatedPassword) {
      throw new UserError("A senha está incorreta!", 400);
    }

    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
  }

  async verifyEmailAlreadyExist(email) {
    const query = "SELECT * FROM user where user.email = ?";

    const user = await connection.execute(query, email);

    if (user) {
      throw new UserError("Usuário com esse email já existe", 400);
    }
  }

  async findByEmail(email) {
    const query = "SELECT * FROM user where user.email = ?";

    const user = await connection.execute(query, email);

    if (user) {
      throw new UserError("Usuário com esse email já existe", 400);
    }
  }
}

export default new UserService();
