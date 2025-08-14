const express = require('express');

const role = require('../middlewares/schema/role');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, permissions } = req.body;

  try {
    const newRole = new role({
      name,
      permissions
    });

    await newRole.save();

    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Error creating role' });
  }
});

module.exports = router;
