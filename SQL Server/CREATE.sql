CREATE SCHEMA IF NOT EXISTS school_management_system; 
USE school_management_system;

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT, 
    firstname VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    usertype INT NOT NULL,			  -- 0 for students, 1 for teachers
    PRIMARY KEY (id)
);

INSERT INTO user
	(firstname, lastname, username, password, usertype)
VALUES
	('John', 'Smith', 'JSmith', 'SmithTheMan', 0), 
    ('Carol', 'Pipper', 'CPipper', 'Pipper!', 0), 
    ('Riley', 'Norris', 'RNorris', 'RiNor', 0),
    ('Kevin', 'Moran', 'KMoran', 'MKevin', 1),
    ('Sarah', 'Smith', 'SSmith', 'MrsSmith', 1),
    ('Jacob', 'Jingle', 'JJingle', 'JingleHeimerSmith', 1);

CREATE TABLE course (
	id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(45) NOT NULL,
    description VARCHAR(225),
    PRIMARY KEY (id)
);

INSERT INTO course 
	(title, description) 
VALUES 
	('Calculus 1', NULL), 
    ('Calculus 2', 'Like Calculus 1, but harder'), 
    ('Calculus 3', 'Like Calculus 2, but harder');

CREATE TABLE teacher_course (
	id INT NOT NULL AUTO_INCREMENT, 
    teacher_id INT,
    course_id INT,
    PRIMARY KEY (id)
);

INSERT INTO teacher_course
	(teacher_id, course_id)
VALUES 
	(1, 1), 
    (2, 2), 
    (3, 3);

CREATE TABLE course_assignment (
	id INT NOT NULL AUTO_INCREMENT, 
    teacher_course_id VARCHAR(45) NOT NULL,
    title VARCHAR(45) NOT NULL,
    description VARCHAR(225),
    PRIMARY KEY (id)
);

INSERT INTO course_assignment 
	(teacher_course_id, title, description)
VALUES
	(1, 'First Calc 1 assignment', 'This is the first calculus assignment'), 
    (2, 'Calc 2 assignment', 'Learning advanced derivatives'), 
    (3, 'Calc 3 testing', NULL);
    

CREATE TABLE student_course (
	id INT NOT NULL AUTO_INCREMENT,
    student_id INT, 
    teacher_course_id INT, 
    PRIMARY KEY (id)
);

INSERT INTO student_course 
	(student_id, teacher_course_id) 
VALUES 
	(1, 1), 
    (1, 2),
    (1, 3),
    (2, 2), 
    (3, 3);

CREATE TABLE student_assignment (
	id INT NOT NULL AUTO_INCREMENT, 
    student_course_id INT NOT NULL, 
    course_assignment_id INT NOT NULL, 
    grade DOUBLE, 
    feedback VARCHAR(225), 
    PRIMARY KEY (id)
);

INSERT INTO student_assignment
	(student_course_id, course_assignment_id, grade, feedback) 
VALUES 
	(1, 1, 90, 'Well done for the start of the year'), 
    (2, 2, 73, 'Please study the notes I provide before you start the assignment'),
    (2, 2, 74.5, 'Could have gone better'), 
    (2, 2, null, null);
    
CREATE TABLE cookie (
	id INT NOT NULL AUTO_INCREMENT, 
    value VARCHAR(225),
    user_id INT,
    user_type INT, -- 1 = student, 2 = teacher
    expire DATETIME,
    PRIMARY KEY (id)
);