import User from "../Models/User.js";
import jwt from 'jsonwebtoken';

/* READ */
// export const getUser = async (req, res) => {

//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.status(200).json(user);

// };

export const getUserFollowers = async (req, res) => {

  const { username } = req.body;
  const user = await User.findOne({ username: username });

  if (user) {
    const followers = await Promise.all(
      user.followers.map((username) => User.findOne(username))
    );

    const formattedFollowers = followers.map(
      ({ first_name, last_name, followers_username }) => {
        return { first_name, last_name, followers_username };
      }
    );



    res.status(200).json(followers);
  }

};

export const Remove = async (req, res) => {
  const { username, followers_username } = req.body;
  const user = await User.findOne({ username: username });
  const followers_user = await User.findOne({ username: followers_username });

  if (user && followers_user) {
    user.followers = user.followers.filter((username) => username !== followers_username);
    followers_user.followings = followers_user.followings.filter((username) => username !== user.username);

    await user.save();
    await followers_user.save();

    res.status(200).json(user);
  }

};


export const getAllUsers = async (req, res) => {
  const all_users = await User.find({});
  res.status(200).json(all_users);
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
  const { username } = req.body;
  const user = await User.findOne({ username: username });

  if (user) {
    const followings = await Promise.all(
      user.followings.map((username) => User.findOne(username))
    );
const formattedFollowings = followings.map(
  ({ first_name, last_name, followings_username }) => {
    return { first_name, last_name, followings_username };
  }
);



res.status(200).json(formattedFollowings);
  }
}

export const Unfollow = async (req, res) => {
  const { username, following_username } = req.body;
  const user = await User.findOne({ username: username });
  const following_user = await User.findOne({ username: following_username });

  if (user && following_user) {
    user.followings = user.followings.filter((username) => username !== following_username);
    following_user.followers = following_user.followers.filter((username) => username !== user.username);

    await user.save();
    await following_user.save();

    res.status(200).json(user);
  }
}

export const getPotentialFollowings = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username: username });

  if (user) {
    const all_users = await User.find({});
    const potential_followings = await Promise.all(
      all_users.map((user) => !User.findOne({ username: user.followings }))
    );
    const formattedPotentialFollowings = potential_followings.map(
      ({ first_name, last_name, potential_followings_username }) => {
        return { first_name, last_name, potential_followings_username };
      }
    );

    res.status(200).json(formattedPotentialFollowings);


  }

}

export const Follow = async (req, res) => {

  const { username, potential_following_username } = req.body;
  const user = await User.findOne({ username: username });
  const potential_following_user = await User.findOne({ username: potential_following_username });

  if (user && potential_following_user) {
    user.followings.push(potential_following_username);
    potential_following_user.followers.push(user.username);

    await user.save();
    await potential_following_user.save();

    res.status(200).json(user);
  }

}


