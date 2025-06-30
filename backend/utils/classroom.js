// utils/classroom.js
const { google } = require('googleapis');

async function getClassroomCourses(accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const classroom = google.classroom({ version: 'v1', auth });

  const res = await classroom.courses.list({ courseStates: ['ACTIVE'] });
  return res.data.courses || [];
}

module.exports = { getClassroomCourses };