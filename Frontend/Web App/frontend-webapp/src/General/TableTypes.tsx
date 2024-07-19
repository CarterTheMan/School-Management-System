export interface student {
    id: number, 
    firstname: String,
    lastname: String, 
    username: String, 
    password: String
}

export interface teacher {
    id: number, 
    firstname: String,
    lastname: String, 
    username: String, 
    password: String
}

export interface course {
    id: number, 
    title: String,
    description: String
}

export interface teacherCourse {
    id: number, 
    teacher: teacher,
    course: course
}

export interface studentCourse {
    id: number, 
    student: student, 
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