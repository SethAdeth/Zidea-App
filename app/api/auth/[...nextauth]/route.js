import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


import { connectToDB } from '@utils/database';



import User from '@models/user'

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

        }),
    ],

    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });

            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            }

            return session;

        },
        

        async signIn({ profile }) {
            try {
                await connectToDB();

                // if a user already exists
                const userExists = await User.findOne({ email: profile.email });

                // if not creat a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }

    


};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };