// export const setCookies = ({ res, token }) => {
//   res.cookie("auth-token", token, {
//     httpOnly: true,
//     secure: false, // true for HTTPS
//     sameSite: "Strict", // CSRF protection
//     maxAge: 3600000, // 1 hour in milliseconds
//     path: "/",
//   });
// };
export const setCookies = (res, token) => {
  res.setHeader(
    "Set-Cookie",
    `auth-token=${token}; HttpOnly; Path=/; SameSite=strict; Max-Age=${
      60 * 60 * 24 * 7
    }`
  );
};
