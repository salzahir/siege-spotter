import prisma from "./prisma";
import {hashPassword, comparePassword} from "../utils/hash";

async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        bestTime: 'asc', // Order by bestTime in ascending order

      },
        select: {
          id: true,
          name: true,
          bestTime: true,
          currentTime: true,
          lastPlayed: true,
        }
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function postUser(name: string, email: string, password: string, time: number) {
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        currentTime: time,
        bestTime: time, 
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function loginUser(email: string, password: string) {
  try {

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password) {
      throw new Error("User has no password set");
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    } 

    return user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export {
  postUser
  , getUsers, 
  loginUser
}
