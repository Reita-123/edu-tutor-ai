const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: "Algebra Fundamentals", teacher: "Mrs. Smith", progress: 100, assignments: 8 },
    { id: 2, name: "Advanced Mathematics", teacher: "Mr. Lee", progress: 45, assignments: 3 }
  ]);
});

module.exports = router;