// Dummy user data for validation
const users = [
  {
    email: "dev@example.com",
    password: "dev123",
    role: "developer",
  },
  {
    email: "manager@example.com",
    password: "manager123",
    role: "manager",
  },
];


export const validateUser = (email, password) => {
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { valid: false, error: "User not found" };
  }

  if (user.password !== password) {
    return { valid: false, error: "Incorrect password" };
  }

  return { valid: true, role: user.role };
};
