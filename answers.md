## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. What is the purpose of using _sessions_?
Session is an easy way to keep data across different requests so that you can track authenthication and verifaction using cookies.

1. What does bcrypt do to help us store passwords in a secure manner.
bcrypt takes in a password and rehashes it to encrypt the password so that hackers will have a really hard time breaking through a users account.
1. What does bcrypt do to slow down attackers?
It encrypts a password multiple times and using salt, can add random characters generated throughout the hash for extra security.
1. What are the three parts of the JSON Web Token?
payload, secret key, and options.