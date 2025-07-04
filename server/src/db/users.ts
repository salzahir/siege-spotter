import prisma from "./prisma";


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
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
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

export {
  postUser
  , getUsers
}
