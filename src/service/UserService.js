import connection from "../db/DatabaseConfig";
import Errors from "../errors/Errors";

class UserService {
  async findUserById(id) {
    const query = "SELECT * FROM user where user.id = ?";

    const [result] = await connection.execute(query, id);

    if (result == null) {
      throw new Errors.UserError("Usuário não encontrado!", 404);
    }

    return result;
  }

  async findUserByEmail(email) {
    const query = "SELECT * FROM user where user.email = ?";

    const user = await connection.execute(query, email);

    if (user) {
      throw new Errors.UserError("Usuário com esse email já existe", 400);
    }
  }

  async createUser(data) {
    if (data.email == null || data.password == null) {
      throw new Errors.UserError("Email ou senha devem ser preenchidos!", 400);
    }

    await this.findUserById();

    const query = "INSERT INTO user (name, email, password) values (?,?,?)";

    //encoder password

    const [rows] = await connection.execute(
      query,
      data.name,
      data.email,
      data.password
    );

    if (rows <= 0) {
      throw new Errors.UserError("Não foi possível criar o usuário!", 404);
    }

    return result;
  }
}

export default new UserService();
