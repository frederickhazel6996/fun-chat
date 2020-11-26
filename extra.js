let users = [];

const addUser = ({ id, name, room, user_id }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.user_id === user_id);

    if (!name || !room) return { error: "Username and room are required." };
    // if (existingUser) return { error: "Username is taken." };

    if (existingUser) {
        const newUsers = users.filter((users) => users.user_id !== user_id);

        const rejoin = { id, name, room, user_id };
        newUsers.push(rejoin);
        users = newUsers;

        return { rejoin };
    }

    const user = { id, name, room, user_id };

    users.push(user);

    return { user };
};

const removeUser = (id) => {
    const tempUsers = users.filter((user) => user.id !== id);

    users = tempUsers;
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
