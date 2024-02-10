"use client";

import { Menu, Person, Search, ShoppingCart } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import "@styles/Navbar.scss";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");
  const searchWork = () => {
    router.push(`/search/${query}`);
  };

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton disabled={query === ""}>
          <Search sx={{ color: "red" }} onClick={searchWork} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {/* Displaying Cart when user logged in */}
        {user && (
          <a href="/cart" className="cart">
            <ShoppingCart sx={{ color: "gray" }} />
            Cart<span>(2)</span>
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: "gray" }} />
          {!user ? (
            <Person sx={{ color: "gray" }} />
          ) : (
            <img
              src={user.profileImagePath}
              alt="profile"
              style={{ objectFir: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link href="/login">Log In</Link>
            <Link href="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/order">Order</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/create-work">Sell Your Work</Link>
            <Link href="">Log Out</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
