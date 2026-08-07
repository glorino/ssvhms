import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const demoUsers: Record<string, { id: string; name: string; email: string; role: string }> = {
          "admin@ssvhms.com": { id: "1", name: "Super Admin", email: "admin@ssvhms.com", role: "SUPER_ADMIN" },
          "admin@hospital.com": { id: "2", name: "Dr. Hospital Admin", email: "admin@hospital.com", role: "ADMIN" },
          "doctor@hospital.com": { id: "3", name: "Dr. Priya Sharma", email: "doctor@hospital.com", role: "DOCTOR" },
          "nurse@hospital.com": { id: "4", name: "Nurse Anita", email: "nurse@hospital.com", role: "NURSE" },
          "pharmacist@hospital.com": { id: "5", name: "Pharmacist Rahul", email: "pharmacist@hospital.com", role: "PHARMACIST" },
          "pathologist@hospital.com": { id: "6", name: "Dr. Sneha", email: "pathologist@hospital.com", role: "PATHOLOGIST" },
          "radiologist@hospital.com": { id: "7", name: "Dr. Kumar", email: "radiologist@hospital.com", role: "RADIOLOGIST" },
          "accountant@hospital.com": { id: "8", name: "Vikram", email: "accountant@hospital.com", role: "ACCOUNTANT" },
          "receptionist@hospital.com": { id: "9", name: "Priyanka", email: "receptionist@hospital.com", role: "RECEPTIONIST" },
          "patient@hospital.com": { id: "10", name: "Rajesh Kumar", email: "patient@hospital.com", role: "PATIENT" },
        }

        const user = demoUsers[credentials.email]

        if (!user || credentials.password !== "password") {
          return null
        }

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, role: (user as any).role, id: user.id }
      }
      return token
    },
    async session({ session, token }) {
      const newSession = { ...session }
      if (newSession.user) {
        ;(newSession.user as any).role = token.role
        ;(newSession.user as any).id = token.id
      }
      return newSession
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
