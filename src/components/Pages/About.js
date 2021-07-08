import React from "react";
import "./pages.css";

export default function About() {
  return (
    <div className="about-us page-container">
      <h1 className="page-title">About us</h1>
      <div className="text">
      <h2>
        All your movies and TV shows, all in one place, on all your devices.
        Movies and TV brings you the latest entertainment in one simple, fast, and
        elegant app. You can use the app to browse and play movies and TV shows
        you’ve rented or purchased from the Store. The app also lets you play
        and manage videos from your personal collection.
      </h2>

      <h2>
        iMovie is a video editing software application developed by Apple Inc.
        for macOS, iOS, and iPadOS devices. It was originally released in 1999
        as a Mac OS 8 application bundled with the first FireWire-enabled
        consumer Mac model – the iMac DV. Since version 3, iMovie has been a
        macOS-only application included with the iLife suite of Mac
        applications. iMovie was included for free with the purchase of a new
        Mac or iOS device in late 2013 and has been free to all users since
        early 2017.
      </h2>
      </div>
      <div className="about1">
        <buttom className="about" type="submit">
          Contact us
        </buttom>
      </div>
    </div>
  );
}
