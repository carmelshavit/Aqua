// just the service load and save data from disk/db/api
import fs from 'fs';

export const usersMap = new Map();
let latestId = 1;

export function loadUsers() {
  const data = fs.readFileSync('./users.json');
  const users = JSON.parse(data);
  for (const user of users) {
    usersMap.set(user.id, user);
    const numId = parseInt(user.id);
    if (numId > latestId) {
      latestId = numId;
    }
  }
  console.log("Users loaded:", usersMap.size);
}

export function getNextId() {
  return ++latestId;
}

export function getAllUsers() {
  return Array.from(usersMap.values());
}

export function findUserByName(name) {
  for (const user of usersMap.values()) {
    if (user.name.toLowerCase() === name.toLowerCase()) {
      return user;
    }
  }
  return null;
}

export function addUser(user) {
  usersMap.set(user.id, user);
}

export function userExists(name) {
  return findUserByName(name) !== null;
}

export function saveUsersToFile(callback) {
  const users = [];
  for (const user of usersMap.values()) {
    users.push(user);
  }
  fs.writeFile('./users.json', JSON.stringify(users, null, 2), callback);
}
