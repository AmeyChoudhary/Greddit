import User from "../Models/User.js";
import jwt from 'jsonwebtoken';

/* READ */
// export const getUser = async (req, res) => {

//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.status(200).json(user);

// };

export const getUserFollowers = async (req, res) => {

  const  { username } = req.body;
  const user = await User.findOne({ username: username });

  if(user){
    // const followers = await Promise.all(
    //   user.followers.map((id) => User.findById(id))
    // );
    const all_users = await User.find({});
    // const formattedFollowers = followers.map(
    //   ({ _id, first_name, last_name, username }) => {
    //     return { _id, first_name, last_name, username };
    //   }
    // );
    // console.log(all_users)
    res.status(200).json(all_users);
  }

};

export const updateUserprofile = async (req, res) => {
  const { newData } = req.body;
  const user = await User.findOne({ username: newData.username });

  if (user) {
    user.contact_number = newData.contact_number;
    user.user_description = newData.user_description;
    user.age = newData.age;
    user.first_name = newData.first_name;
    user.last_name = newData.last_name;

    await user.save()

    const token = jwt.sign({ id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, username: user.username, contact_number: user.contact_number, age: user.age, followers_num: user.followers_num, following_num: user.following_num, user_description: user.user_description }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token });

  }



}

export const getUserFollowing = async (req, res) => {
}

