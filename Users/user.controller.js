import { usersMap, saveUsersToFile,loadUsers } from './user.service.js';
loadUsers();

function isValidIsraeliID(id) {
  if (typeof id !== 'number' || id < 1000000 || id > 999999999) return false;

  let idStr = id.toString();
  while (idStr.length < 9) {
    idStr = '0' + idStr; 
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = Number(idStr[i]);
    let mult = (i % 2) + 1;
    let val = num * mult;
    if (val > 9) val -= 9;
    sum += val;
  }

  return sum % 10 === 0;
}


function isValidPhoneNumber(phone) {
  if (typeof phone !== 'string') return false;
  if (!phone.startsWith('0')) return false;
  if (phone.length !== 10) return false;

  for (let i = 0; i < phone.length; i++) {
    if (phone[i] < '0' || phone[i] > '9') return false;
  }

  return true;
}

export async function createUser(req, res) {
  try {
    const { name, phone, address, id } = req.body;

    if (!name || !phone || !address || !id) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (!isValidIsraeliID(id)) {
      return res.status(400).json({ error: "Invalid Israeli ID" });
    }

    if (!isValidPhoneNumber(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    for (const user of usersMap.values()) {
      if (user.name.toLowerCase() === name.toLowerCase()) {
        return res.status(409).json({ error: "User already exists" });
      }
    }

    const newUser = {
      id,
      name,
      phone,
      address
    };

    usersMap.set(id.toString(), newUser);

    saveUsersToFile((err) => {
      if (err) {
        handleServerError(err, res);
      } else {
        res.status(201).json({ id });
      }
    });

  } catch (err) {
    res.status(400).json({ error: "Invalid request" });
  }
}


export function getAllUserNames(req, res) {
  const names = [];
  for (const user of usersMap.values()) {
    names.push(user.name);
  }
  res.status(200).json(names);
}

export function getUserByName(req, res) {
  const nameQuery = req.params.name.toLowerCase();
  let found = null;
  for (const user of usersMap.values()) {
    if (user.name.toLowerCase() === nameQuery) {
      found = user;
      break;
    }
  }

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
