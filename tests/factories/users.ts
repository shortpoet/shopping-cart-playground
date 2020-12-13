import { getRepository, DeepPartial } from "typeorm";
import { User } from "../../src/entity/User";

export const createUser = (attrs: DeepPartial<User>): Promise<User> => {
  const repo = getRepository(User);
  return repo.save(<User>{
    username: attrs.username || 'CoolGuy7',
    password: attrs.password || 'secret'
  });
};
