import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      callbacks: {
        async session({ session }) {
          const sessionUser = await User.findOne({ email: session.user.email });
          session.user.id = sessionUser._id.toString();
          return session;
        },
        async signIn({ account, profile }) {
          if (account.providers === "google") {
            try {
              await connectToDB();

              //check if user exists
              let user = await User.findOne({ email: profile.email });

              if (!user) {
                user = await User.create({
                  username: profile.name,
                  email: profile.email,
                  profileImagePath: profile.picture,
                  wishlist: [],
                  cart: [],
                  order: [],
                  work: [],
                });
              }
              return user;
            } catch (err) {
              console.log("Error in next auth ->>", err);
            }
          }
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
