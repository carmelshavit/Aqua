import { usersMap, saveUsersToFile, getNextId } from './user.service.js';
import { handleServerError } from './error.utils.js';

export async function createUser(req, res) {
  try {
    const { id, name, phone, address } = req.body;

    if (!id || !name || !phone || !address) {
      return res.status(400).json({ error: "Missing fields" });
    }

    for (const user of usersMap.values()) {
      if (user.name.toLowerCase() === name.toLowerCase()) {
        return res.status(409).json({ error: "User already exists" });
      }
    }

    const newUser = {
      id: getNextId(),
      name,
      phone,
      address
    };

    usersMap.set(newUser.id.toString(), newUser);

    saveUsersToFile((err) => {
      if (err) {
        handleServerError(err, res);
      } else {
        res.status(201).json({ id: newUser.id });
      }
    });

  } catch (err) {
    res.status(400).json({ error: "Invalid request" });
  }
}

export function getAllUserNames(req, res) {
  const names = Array.from(usersMap.values(), user => user.name);
  res.status(200).json(names);
}

export function getUserByName(req, res) {
  const nameQuery = req.params.name.toLowerCase();
  const user = Array.from(usersMap.values()).find(u => u.name.toLowerCase() === nameQuery);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
