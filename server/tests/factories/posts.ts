// import { DeepPartial, getRepository } from "typeorm";
// import { Post } from "../../src/entity/Post";
// import { User } from "../../src/entity/User";
// import moment from 'moment'


// ;

// export const createPost = (attrs: DeepPartial<Post>, user: User,): Promise<Post> => {
//   const repo = getRepository(Post);
//   return repo.save(<Post>{
//     title: attrs.title || 'My Cool Post',
//     userId: user.id,
//     created: moment()
//   });
// };
