// app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Configuración de las opciones de autenticación
const authOptions: AuthOptions = {
  providers: [
    // Proveedor de autenticación con Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Proveedor de autenticación con credenciales (email y contraseña)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;

        // Aquí se realizaría la verificación de usuario en la base de datos
        const user = await findUserByEmail(email);

        if (!user) {
          // Si el usuario no existe, se registra
          const newUser = await registerUser(email, password);
          if (newUser) {
            return { id: newUser.id, name: newUser.name, email: newUser.email };
          } else {
            throw new Error("Error during user registration");
          }
        } else {
          // Si el usuario existe, se valida la contraseña
          const isValid = await validatePassword(user, password);
          if (isValid) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            throw new Error("Invalid credentials");
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Página personalizada de inicio de sesión
  },
  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de definir un secreto seguro
};

// Funciones simuladas para encontrar y registrar usuarios
async function findUserByEmail(email: string) {
  // Busca al usuario en la base de datos
  return null; // Si no existe, devuelve null
}

async function registerUser(email: string, password: string) {
  // Registra al usuario en la base de datos y devuelve el objeto del usuario
  return { id: 2, name: "New User", email }; // Simulación de nuevo usuario
}

async function validatePassword(user: any, password: string) {
  // Lógica para validar la contraseña del usuario
  return password === "password123"; // Simulación de validación
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
