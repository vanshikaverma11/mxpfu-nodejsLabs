const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
      "firstName":"Jon",
      "lastName":"Lovato",
      "email":"jonlovato@theworld.com",
      "DOB":"10/10/1995",
    },
    {
      "firstName":"Joyal",
      "lastName":"white",
      "email":"joyalwhiye@theworld.com",
      "DOB":"21/03/1989"
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"1/1/1971",
    },
];

// Define a route handler for GET requests to the root path "/"
router.get("/",(req,res)=>{
  // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({users}, null, 4));
});

router.get("/:email",(req,res)=>{
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to find users whose email matches the extracted email parameter
  let filtered_users = users.filter((user) => user.email === email);
  // Send the filtered_users array as the response to the client
  res.send(filtered_users);
});

router.post("/",(req,res)=>{
  // Push a new user object into the users array based on query parameters from the request
  users.push({
      "firstName": req.query.firstName,
      "lastName": req.query.lastName,
      "email": req.query.email,
      "DOB": req.query.DOB
  });
  // Send a success message as the response, indicating the user has been added
  res.send("The user " + req.query.firstName + " has been added!");
});

router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  
  if (filtered_users.length > 0) {
      // Select the first matching user and update attributes if provided
      let filtered_user = filtered_users[0];
      
       // Extract and update DOB if provided
      
      let DOB = req.query.DOB;    
      if (DOB) {
          filtered_user.DOB = DOB;
      }

      /*
      Include similar code here for updating other attributes as needed
      */

       // Extract and update firstname if provided
      
       let firstName = req.query.firstName;    
       if (firstName) {
           filtered_user.firstName = firstName;
       }
       // Extract and update firstname if provided

       let lastName = req.query.lastName;    
       if (lastName) {
           filtered_user.lastName = lastName;
       }
      // Replace old user entry with updated user
      users = users.filter((user) => user.email != email);
      users.push(filtered_user);
      
      // Send success message indicating the user has been updated
      res.send(`User with the email ${email} updated.`);
  } else {
      // Send error message if no user found
      res.send("Unable to find user!");
  }
});

router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);
  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
