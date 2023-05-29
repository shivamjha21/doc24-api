const express = require('express');
const router = express.Router();

const { signup, signin, fetchuser, createDisese, fetchDisease, createMeeting, update_status, update_status_disease, createUser, delete_user, delete_disease, fetchDoctor, fetchMeetings, countCustomers, countDoctors, countMeets, countDisease, update_status_meeting, update_user_data } = require('../controllers/user');


router.post('/signup',signup);
router.post('/signin',signin);
router.post('/fetch-user',fetchuser);
router.post('/create-user',createUser);
router.post("/update-user-status", update_status);
router.post("/delete-user", delete_user);
router.post("/fetch-doctor", fetchDoctor);
router.post("/update-profile", update_user_data);

router.post('/create-disease',createDisese);
router.post('/fetch-disease',fetchDisease);
router.post("/delete-disease", delete_disease);
router.post("/update-disease-status", update_status_disease);


router.post('/create-meeting',createMeeting);
router.post("/fetch-meetings", fetchMeetings);
router.post("/update-meeting-status", update_status_meeting);

router.post("/count-users", countCustomers)
router.post("/count-doctors", countDoctors)
router.post("/count-meetings", countMeets)
router.post("/count-disease", countDisease)

module.exports = router;