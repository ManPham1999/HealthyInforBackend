const { User } = require("../../../models/user.model");
const { Friend } = require("../../../models/Friend.model");
var jwt = require("jsonwebtoken");
const { jwtKey } = require("../../../Key");
const { Report } = require("../../../models/report.model");
const UpdateUserHeightAndWeight = async (req, res) => {
  const { id } = req.params;
  const { height, weight } = req.body;
  if (height === "" || weight === "") {
    return res.status(400).json({
      message: "height or weight is empty",
    });
  } else if (!id || id === "") {
    return res.status(400).json({
      message: "id is empty",
    });
  }
  await User.findByIdAndUpdate(
    id,
    { $set: { height, weight } },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        message: "updated!",
      });
    }
  );
};
const Login = async (req, res) => {
  const { userName, email, avatar } = req.body;
  let result = await User.findOne({ email });
  if (result) {
    if (result.userName !== userName) {
      return res.status(400).json({
        message: "userName is wrong",
      });
    }
    // Xử lí đăng nhập
    const payload = {
      userName: result.userName,
      email: result.email,
      avatar: result.avatar,
      id: result._id,
    };
    await jwt.sign(
      {
        payload,
      },
      jwtKey,
      (err, token) => {
        if (err) return console.log(err);
        return res.status(200).json({
          sucess: true,
          token: token,
          payload,
        });
      }
    );
  }
};
const insertReport = async (req, res) => {
  let { time, avgSpeed, calories, distance } = req.body;
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "User not found!",
    });
  }
  // let user = await User.findById(id);
  let report = await Report.create({
    speedavg: avgSpeed,
    time,
    calories,
    distance,
  });

  if (report !== undefined) {
    User.updateOne({ _id: id }, { $push: { reports: report } }, (err, val) => {
      if (err) {
        return res.status(400).json({
          message: err,
        });
      }
      return res.status(200).json({
        message: "add success!",
      });
    });
  }
};
// const singUp = async (req, res) => {
// 	const {email, userName, passWord, passWord2, avatar} = req.body;
// 	if (
// 		email !== 'null' &&
// 		userName !== 'null' &&
// 		passWord !== 'null' &&
// 		passWord2 !== 'null' &&
// 		avatar !== 'null'
// 	) {
// 		if (passWord !== passWord2) {
// 			res.status(400).json({
// 				message: 'password not matched',
// 			});
// 		} else {
// 			const existedUser = await User.find({email});
// 			if (existedUser) {
// 				res.status(200).json({
// 					userExisted: true,
// 				});
// 			} else {
// 				const newUser = await User.create({email, userName, passWord, avatar});
// 				res.status(200).json({
// 					registered: true,
// 					data: newUser,
// 				});
// 			}
// 		}
// 	}
// 	res.status(400).json({
// 		message: 'not null accepted!',
// 	});
// };
const Request = async (req, res) => {
  let { UserA, UserB } = req.body;
  if (UserA === "") {
    res.status(400).json({
      message: "requester is empty",
    });
  } else {
    if (UserB === "") {
      res.status(400).json({
        message: "recipient is empty",
      });
    }
  }
  const docA = await Friend.findOneAndUpdate(
    {
      requester: UserA,
      recipient: UserB,
    },
    { $set: { status: 1 } },
    { upsert: true, new: true }
  );
  const docB = await Friend.findOneAndUpdate(
    {
      recipient: UserA,
      requester: UserB,
    },
    { $set: { status: 2 } },
    { upsert: true, new: true }
  );
  const updateUserA = await User.findOneAndUpdate(
    { _id: UserA },
    { $push: { friendlist: docA._id } }
  );
  const updateUserB = await User.findOneAndUpdate(
    { _id: UserB },
    { $push: { friendlist: docB._id } }
  );
  res.status(200).json({
    message: "sent request!",
  });
};
const Accept = async (req, res) => {
  let { UserA, UserB } = req.body;
  if (UserA === "") {
    res.status(400).json({
      message: "requester is empty",
    });
  } else {
    if (UserB === "") {
      res.status(400).json({
        message: "recipient is empty",
      });
    }
  }
  await Friend.findOneAndUpdate(
    { requester: UserA, recipient: UserB },
    { $set: { status: 3 } }
  );
  await Friend.findOneAndUpdate(
    { recipient: UserA, requester: UserB },
    { $set: { status: 3 } }
  );
  res.status(200).json({
    accepted: true,
  });
};
const Reject = async (req, res) => {
  let { UserA, UserB } = req.body;

  const docA = await Friend.findOneAndRemove({
    requester: UserA,
    recipient: UserB,
  });
  const docB = await Friend.findOneAndRemove({
    recipient: UserA,
    requester: UserB,
  });
  const updateUserA = await User.findOneAndUpdate(
    { _id: UserA },
    { $pull: { friendlist: docA._id } }
  );
  const updateUserB = await User.findOneAndUpdate(
    { _id: UserB },
    { $pull: { friendlist: docB._id } }
  );
  res.status(200).json({
    rejected: true,
  });
};
const getAllUsers = async (req, res) => {
  await User.find({})
    .populate("friendlist")
    .populate("reports")
    .exec(function (err, users) {
      if (err) return handleError(err);
      res.send(users);
    });
};
const getUserByID = async (req, res) => {
  const { id } = req.params;
  await User.findById(id)
    .populate("friendlist")
    .populate("reports")
    .exec(function (err, user) {
      if (err) return handleError(err);
      res.send(user);
    });
};
module.exports = {
  Login,
  Request,
  Accept,
  Reject,
  getAllUsers,
  getUserByID,
  insertReport,
  UpdateUserHeightAndWeight,
};
