# School-Management-System

This will be an application that will act as the website for a school

Users: 
- Student
- Teacher
- Admin (future plans) 

Stack: 
- MySQL Server
- Springboot Backend
- React Frontend

Steps to run:
1. Run the create.sql script in the "SQL Server" directory so to set up an initial DB. 
2. Run the SpringBoot backend located at "Backend/school-management-system/src/main/java/SchoolManagementSystem/SchoolManagementSystemApplication.java"
3. Start the local webapp by running the command "npm start" in the "Frontend/Web App" directory
   - NOTE: If you don't have all the packages installed, you may have to run the command "npm i"

TODO: 
1. Handle the timing with cookies 
   - Update the time every time a cookie is called in the DB. This is updated in the browser
   - Automatically log out after the cookie has expired 
2. Center the current HTML tables and cards that are slightly misaligned 
3. Implement teacher functionality 
4. Update the sidebar to be custom to the user type (teacher, student)
