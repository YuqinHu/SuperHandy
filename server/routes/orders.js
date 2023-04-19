const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const someInfo = await db.query(`
      SELECT 
        customers.first_name, 
        customers.last_name, 
        skills.skill_name, 
        tasks.create_time, 
        skills.price, 
        tasks.description, 
        tasks.address, 
        customers.email, 
        orders.status,
        orders.id
      FROM 
        customers 
      JOIN 
        tasks ON customers.id = tasks.customer_id 
      JOIN 
        skills ON tasks.skill_id = skills.id 
      JOIN 
        orders ON tasks.id = orders.task_id 
      WHERE
        customers.id = $1
    `, [id]); // Pass the id parameter as a query parameter
    res.json(someInfo.rows);
  } catch (error) {
    // Handle error
    console.error(error);
  }
});

module.exports = router;