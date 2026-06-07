export const loginUser = (req, res) => {
  const { userId, password, mode } = req.body;

  // Dummy users
  const users = [
    { userId: "Ekta", password: "Ekta100110", role: "user" },
    { userId: "Authority", password: "Authority123", role: "authority" },
  ];

  const user = users.find(
    (u) => u.userId === userId && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (mode && user.role !== mode) {
    return res.status(403).json({ message: "Unauthorized mode" });
  }

  res.status(200).json({
    message: `Welcome ${user.role === "authority" ? "Authority" : "User"}!`,
    role: user.role,
  });
};
