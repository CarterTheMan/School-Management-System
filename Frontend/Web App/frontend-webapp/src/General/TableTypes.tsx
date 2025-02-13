export interface user {
    id: number, 
    firstname: String,
    lastname: String, 
    username: String, 
    password: String,
    usertype: number
}

export interface course {
    id: number, 
    title: String,
    description: String
}

export interface teacherCourse {
    id: number, 
    teacher: user,
    course: course
}

export interface studentCourse {
    id: number, 
    student: user, 
    teacherCourse: teacherCourse
}

export interface courseAssignment {
    id: number, 
    title: String, 
    description: String, 
    teacherCourse: teacherCourse
}

export interface studentAssignment {
    id: number, 
    studentCourse: studentCourse, 
    courseAssignment: courseAssignment,
    grade: number, 
    feedback: String
}

