const users = [
    {
        id: 1,
        name: 'Ahmed'
    },
    {
        id: 2,
        name: 'Ehab'
    },
    {
        id: 3,
        name: 'Moustafa'
    },
    {
        id: 4,
        name: 'Eslam'
    }
]

const isUserExists = (userId) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) return true;
    }
    return false;
};

module.exports = {
    isUserExists
};