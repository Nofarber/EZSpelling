import axios from "axios";
import { useInfo } from "./context";


axios.defaults.withCredentials = true;


export const savePDF = async (currUser) => {
    try {
      const res = await axios.post('http://localhost:8000/api/students/save-pdf', currUser);
      console.log(res);
    } catch (error) {
      console.error('Error saving PDF:', error);
    }
  };

export const signup = async (userData) => {
    return axios.post(
        `http://localhost:8000/api/users/signup`,
        userData
    );
};

export const loginStudent = async (credentials) => {
    return axios.post(
        `http://localhost:8000/api/students/studentlog`,
        credentials
    );
};
export const loginTeacher = async (credentials) => {
    return axios.post(
        `http://localhost:8000/api/teacher/login`,
        credentials, {
            withCredentials: true,
        }
    );
};
export const composeDiary = async (questions) => {
    console.log(questions);
    return axios.post(
        `http://localhost:8000/api/students/compose`,
        questions, {
            withCredentials: true,
        }
    );
};

export const updateStudent = async (data) => {
    return axios.post(
        `http://localhost:8000/api/students/update`,
        data, {
            withCredentials: true,
        }
    );
};

export const getAllStudents = async (data) => {
    return axios.post(
        `http://localhost:8000/api/teacher/teachersstudents`,
        data, {
            withCredentials: true,
        }
    );
};
export const newStudents = async (data) => {
    return axios.post(
        `http://localhost:8000/api/teacher/student`,
        data, {
            withCredentials: true,
        }
    );
};



export const logout = async () => {

    try {
        await axios.get(`http://localhost:8000/api/users/logout`, {
            withCredentials: true,
        });
        console.log("Logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const authenticate = async () => {
    return axios.get(`http://localhost:8000/api/users/authenticate`, {
        withCredentials: true,
    });
};

export const ask = async (question) => {
    return axios.post(`http://localhost:8000/api/users/ask`,
        question
    );
};