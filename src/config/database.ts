import mongoose from 'mongoose';

// import ArticleModel from '../model/article';
// import UserModel from '../model/user';
// require('dotenv').

import bcrypt from 'bcrypt';

export default async () => {
  try {
    // const DEFAULT_PWD = bcrypt.hashSync('123456', 10);

    await mongoose.connect('mongodb://localhost:27017/training', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongodb');

    // await UserModel.deleteMany();
    // await UserModel.insertMany([
    //     {
    //         email: 'huy@gmail.com',
    //         password: DEFAULT_PWD,
    //     }
    // ]);

    // await ArticleModel.deleteMany();
    // await ArticleModel.insertMany([
    //     {
    //         id: 1,
    //         title: 'Covid can quet Da Nang',
    //         slug: 'Covid-can-quet-Da-Nang',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //         createdAt: '2019-05-22T11:41:07.483Z',
    //     },
    //     {
    //         id: 2,
    //         title: 'Hello',
    //         slug: 'Hello',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //         createdAt: '2020-05-22T11:41:07.483Z',
    //     },
    //     {
    //         id: 3,
    //         title: 'Chao a fus',
    //         slug: 'Chao-a-fus',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    //     },
    //     {
    //         id: 4,
    //         title: 'How to 4.0 and lay hoc bong',
    //         slug: 'How-to-4.0-and-lay-hoc-bong',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    //     },
    // ])
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
