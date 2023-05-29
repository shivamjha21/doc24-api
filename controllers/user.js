const Users = require('../models/user')

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require('../models/user');
const Disease = require('../models/disease');
const Meetings = require('../models/meetings');
const saltRounds = 10;

const JWT_SECRET = "hare-krishna_hare-krishna";


exports.signup = async (req, res) => {
    var where = {};
    where['email'] = req.body.email;
    Users.findOne(where)
        .then(response => {
            if (response != null) {
                res.status(200).send({
                    status: "error",
                    message: "Email already in use.",
                    result: [],
                });
            } else {
                bcryptjs.genSalt(saltRounds, (err, salt) => {
                    bcryptjs.hash(req.body.password, salt, (err, hash) => {
                        var userdata = new Users({
                            password: hash,
                            email: req.body.email,
                            name: req.body.fullname,
                            phone: req.body.phone,
                            gender: req.body.gender,
                            address: req.body.address
                        });
                        userdata.save(function (err, response) {
                            if (err) {
                                res.status(200).send({
                                    status: "error",
                                    message: err,
                                });
                            } else {
                                // console.log(otp,'email_otp')
                                res.status(200).send({
                                    status: "success",
                                    message: "Registration was successfull",
                                });
                            }
                        });
                    });
                });
            }
        })
};


exports.signin = (req, res) => {
    var where = {};
    where['email'] = req.body.email;
    if (!req.body.password || !req.body.email) {
        return res.status(200).send({
            status: "Error",
            message: "Please Provide Email and password",
        });
    }
    Users.findOne(where)
        .then(response => {
            bcryptjs.compare(req.body.password, response.password, function (err, result) {
                if (result == true) {
                    const accessToken = jwt.sign(
                        {
                            email: req.body.email,
                        },
                        JWT_SECRET,
                        {
                            expiresIn: "180000s",
                        }
                    );

                    res.status(200).send({
                        status: "success",
                        message: "Signed in",
                        token: accessToken,
                        result: response,
                    });
                } else {
                    res.status(200).send({
                        status: "error",
                        message: "Invalid email/password",
                    });
                }
            });
        })
}


exports.createUser = (req, res) => {
    var where = {};
    where["phone"] = req.body.phone;

    Users.findOne(where)
        .then((response) => {
            if (response != null) {
                res.status(200).send({
                    status: "error",
                    message: "Phone Number already in use.",
                });
            } else {
                bcryptjs.genSalt(saltRounds, (err, salt) => {
                    bcryptjs.hash(req.body.password, salt, (err, hash) => {
                        var userdata = new Users({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            phone: req.body.phone,
                            gender: req.body.gender,
                            date_of_birth: req.body.date_of_birth,
                            amount_charge: req.body.amount_charge,
                            user_type: req.body.user_type,
                            address: req.body.address,
                            // state: req.body.state,
                            // district: req.body.district,
                            // pincode: req.body.pincode,
                            // city: req.body.city,
                            qualification: req.body.qualification,
                            about: req.body.about,
                            specialist: req.body.specialist
                        });
                        userdata.save(function (err, response) {
                            if (err) {
                                res.status(200).send({
                                    status: "error",
                                    message: err,
                                });
                            } else {
                                // console.log(otp,'email_otp')
                                res.status(200).send({
                                    status: "success",
                                    message: "Registration was successfull",
                                });
                            }
                        });
                    });
                });
            }
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: error.message,
            });
        });
}


exports.update_user_data = (req, res) => {
    var where = {};
    if (req.body.id) {
        where['_id'] = req.body.id;
        if (req.body.password) {
            bcryptjs.genSalt(saltRounds, (err, salt) => {
                bcryptjs.hash(req.body.password, salt, (err, hash) => {
                    Users.findByIdAndUpdate(
                        where,
                        {
                            password: hash,
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone
                        },
                        { new: true, useFindAndModify: false },
                        (err, user) => {
                            if (err) {
                                return res.status(200).send({
                                    status: "error",
                                    message: err,
                                });
                            }

                            res.status(200).send({
                                status: "success",
                                message: "Your data updated",
                            });
                        });
                });
            });
        } else {
            Users.findByIdAndUpdate(
                where,
                {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone
                },
                { new: true, useFindAndModify: false },
                (err, user) => {
                    if (err) {
                        return res.status(200).send({
                            status: "error",
                            message: err,
                        });
                    }
                    res.status(200).send({
                        status: "success",
                        message: "Your data updated",
                        result: user
                    });

                })
            }
        }

    };

    exports.fetchuser = (req, res) => {
        var where = {};
        where['deleted'] = 0;
        Users.find(where).then(response => {
            Users.find(where).countDocuments(function (err, count) {
                res.status(200).send({
                    status: "success",
                    // token: req.token,
                    result: response,
                    totalCount: count,
                });
            });
        })
    }



    exports.fetchDoctor = (req, res) => {
        var where = {};
        where['deleted'] = 0;
        where["user_type"] = "doctor";
        Users.find(where).then(response => {
            Users.find(where).countDocuments(function (err, count) {
                res.status(200).send({
                    status: "success",
                    // token: req.token,
                    result: response,
                    totalCount: count,
                });
            });
        })
    }



    exports.update_status = (req, res) => {
        var where = {};
        if (req.body.id) {
            where['_id'] = req.body.id;

            Users.findByIdAndUpdate(
                where,
                { active: req.body.active },
                { new: true, useFindAndModify: false },
                (err, user) => {
                    if (err) {
                        return res.status(200).send({
                            status: "error",
                            message: err,
                        });
                    }

                    res.status(200).send({
                        status: "success",
                        message: "User status updated",
                    });
                })
        }

    };


    exports.delete_user = (req, res) => {
        var where = {};
        if (req.body.id) {
            where['_id'] = req.body.id;

            Users.findByIdAndUpdate(
                where,
                { deleted: 1 },
                { new: true, useFindAndModify: false },
                (err, user) => {
                    if (err) {
                        return res.status(200).send({
                            status: "error",
                            message: err,
                        });
                    }

                    res.status(200).send({
                        status: "success",
                        message: "User deleted",
                    });
                })
        }

    };

    exports.createDisese = async (req, res) => {
        var where = {};
        where['name'] = req.body.name;
        Users.findOne(where)
            .then(response => {
                if (response != null) {
                    res.status(200).send({
                        status: "error",
                        message: "Disese name already in use.",
                        result: [],
                    });
                } else {
                    var diseaseData = new Disease({
                        name: req.body.name,
                        description: req.body.description ? req.body.description : "",
                        short_description: req.body.short_description ? req.body.short_description : ""
                    });
                    diseaseData.save(function (err, response) {
                        if (err) {
                            res.status(200).send({
                                status: "error",
                                message: err,
                            });
                        } else {
                            // console.log(otp,'email_otp')
                            res.status(200).send({
                                status: "success",
                                message: "Disease data save successfully.",
                            });
                        }
                    });
                }
            })
    };

    exports.update_status_disease = (req, res) => {
        var where = {};
        if (req.body.id) {
            where['_id'] = req.body.id;

            Disease.findByIdAndUpdate(
                where,
                { active: req.body.active },
                { new: true, useFindAndModify: false },
                (err, user) => {
                    if (err) {
                        return res.status(200).send({
                            status: "error",
                            message: err,
                        });
                    }

                    res.status(200).send({
                        status: "success",
                        message: "Disease status updated",
                    });
                })
        }

    };


    exports.delete_disease = (req, res) => {
        var where = {};
        if (req.body.id) {
            where['_id'] = req.body.id;

            Disease.findByIdAndUpdate(
                where,
                { deleted: 1 },
                { new: true, useFindAndModify: false },
                (err, user) => {
                    if (err) {
                        return res.status(200).send({
                            status: "error",
                            message: err,
                        });
                    }

                    res.status(200).send({
                        status: "success",
                        message: "Disease deleted",
                    });
                })
        }

    };

    exports.fetchDisease = (req, res) => {
        var where = {};
        if (req.body.name) {
            where["name"] = req.body.name;
        }
        if (req.body.active) {
            where["active"] = Number(req.body.active);
        };
        where['deleted'] = 0;
        Disease.find(where).then(response => {
            Disease.find(where).countDocuments(function (err, count) {
                res.status(200).send({
                    status: "success",
                    // token: req.token,
                    result: response,
                    totalCount: count,
                });
            });
        })
    }




    exports.createMeeting = async (req, res) => {
        var where = {};
        where['user'] = req.body.user;
        where['doctor'] = req.body.doctor;
        where['status'] = "pending";
        Users.findOne({ _id: req.body.user }).then((resp) => {
            Meetings.findOne(where)
                .then(response => {
                    if (response != null) {
                        res.status(200).send({
                            status: "error",
                            message: "Meeting already scheduled.",
                            result: [],
                        });
                    } else {
                        var meetingData = new Meetings({
                            user: req.body.user,
                            doctor: req.body.doctor,
                            date: req.body.date,
                            time: req.body.time,
                            disease: req.body.disease,
                            appointment_type: req.body.appointment_type,
                            note: req?.body?.note,
                            amount: resp?.free_meetings === 0 ? 500 : 0,
                            amount_status: resp?.free_meetings === 0 ? "unpaid" : "paid"
                        });
                        meetingData.save(function (err, response) {
                            if (err) {
                                res.status(200).send({
                                    status: "error",
                                    message: err,
                                });
                            } else {
                                Users.findByIdAndUpdate(
                                    { _id: req.body.user },
                                    { free_meetings: resp?.free_meetings > 0 ? resp - 1 : 0 },
                                    { new: true, useFindAndModify: false },
                                    (err, user) => {
                                        if (err) {
                                            return res.status(200).send({
                                                status: "error",
                                                message: err,
                                            });
                                        }
                                        res.status(200).send({
                                            status: "success",
                                            message: "Meeting Scheduled successfully.",
                                        });
                                    })
                                // console.log(otp,'email_otp')

                            }
                        });
                    }
                });

        })
    };


    exports.update_status_meeting = (req, res) => {
        var where = {};
        if (req.body.id) {
            where['_id'] = req.body.id;

            Meetings.findByIdAndUpdate(
                where,
                { status: req.body.status },
                { new: true, useFindAndModify: false },
                (err, user) => {
                    if (err) {
                        return res.status(200).send({
                            status: "error",
                            message: err,
                        });
                    }

                    res.status(200).send({
                        status: "success",
                        message: "Meeting status updated",
                    });
                })
        }

    };

    exports.fetchMeetings = (req, res) => {
        var where = {};
        if (req.body.name) {
            where["user"] = req.body.user;
        }
        if (req.body.doctor) {
            where["doctor"] = req.body.doctor;
        };
        if (req.body.appointment_type) {
            where["appointment_type"] = req.body.appointment_type;
        }
        if (req.body.disease) {
            where["disease"] = req.body.disease;
        };
        where['deleted'] = 0;

        Meetings.find(where).populate("user doctor disease").then(response => {
            Meetings.find(where).countDocuments(function (err, count) {
                res.status(200).send({
                    status: "success",
                    // token: req.token,
                    result: response,
                    totalCount: count,
                });
            });
        })
    }



    exports.countCustomers = (req, res) => {
        var where = {};
        where['deleted'] = 0;
        where["user_type"] = "user";
        Users.find(where).countDocuments(function (err, count) {
            res.status(200).send({
                status: "success",
                totalCount: count,
            });
        });
    }


    exports.countDoctors = (req, res) => {
        var where = {};
        where['deleted'] = 0;
        where["user_type"] = "doctor";
        Users.find(where).countDocuments(function (err, count) {
            res.status(200).send({
                status: "success",
                totalCount: count,
            });
        });
    }



    exports.countDisease = (req, res) => {
        var where = {};
        where['deleted'] = 0;

        Disease.find(where).countDocuments(function (err, count) {
            res.status(200).send({
                status: "success",
                totalCount: count,
            });
        });
    }


    exports.countMeets = (req, res) => {
        var where = {};
        where['deleted'] = 0;

        Meetings.find(where).countDocuments(function (err, count) {
            res.status(200).send({
                status: "success",
                totalCount: count,
            });
        });
    }