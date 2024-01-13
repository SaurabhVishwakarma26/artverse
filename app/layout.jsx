import "@styles/globals.css";

export const metadata = {
  title: "Artverse",
  description: "The Artverse where you can share artworks with others",
};
function layout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default layout;
