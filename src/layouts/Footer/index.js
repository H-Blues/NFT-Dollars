import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Input, IconButton } from "@material-tailwind/react";
import logo from "../../assets/logo.svg";
import { ReactComponent as Github } from "../../assets/github.svg";
import { ReactComponent as Telegram } from "../../assets/telegram.svg";
import { ReactComponent as Twitter } from "../../assets/twitter.svg";
import { ReactComponent as Discord } from "../../assets/discord.svg";
import { Link } from "react-router-dom";
import { SvgIcon } from "@mui/material";

const CONTENTS = [
  {
    title: "Pages",
    items: ["Home", "Docs", "Borrow", "RiskyTroves"],
    routes: ["/", "/doc", "/borrow", "/riskyTroves"],
  },
  {
    title: "Contact",
    items: ["📩 nftdollars@gmail.com", "📍 Address", "📞 732-528-4945"],
    routes: ["#", "#", "#"],
  },
  {
    title: "Resource",
    items: ["Newsletter"],
    routes: ["#"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  const [email, setEmail] = useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <footer className="absolute bottom-0 left-0 right-0 pt-4 bg-[#fbf8f0]">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 space-y-4">
          <img src={logo} alt="logo" className="m-auto w-1/3 md:w-1/2 col-span-2 md:col-span-1" />
          {CONTENTS.map(({ title, items, routes }) => (
            <ul key={title} className={title === "Resource" ? "col-span-2 md:col-span-1" : ""}>
              <Typography variant="small" color="blue-gray" className="mb-3 font-medium opacity-40">
                {title}
              </Typography>
              {items.map((link, index) => (
                <li key={link}>
                  <Typography
                    as={Link}
                    to={routes[index]}
                    color="gray"
                    className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                  >
                    {link}
                  </Typography>
                  {title === "Resource" && (
                    <>
                      <Typography as="p" color="black">
                        Subscribe to our newsletter for updates
                      </Typography>
                      <div className="relative flex w-4/5 " style={{ marginTop: "1rem" }}>
                        <Input
                          type="email"
                          label="Enter your email"
                          color="orange"
                          value={email}
                          onChange={onChange}
                          className="pr-20"
                          containerProps={{
                            className: "min-w-0",
                          }}
                        />
                        <IconButton
                          size="sm"
                          color={email ? "yellow" : "gray"}
                          disabled={!email}
                          className="!absolute right-1 top-1 rounded"
                        >
                          ⇨
                        </IconButton>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            Copyright &copy; {currentYear} <a href="https://material-tailwind.com/">NFTdollars</a>.
            All Rights Reserved.
          </Typography>

          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href="https://github.com/neo-project"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <SvgIcon component={Github} className="h-2 w-2" />
            </Typography>
            <Typography
              as="a"
              href="https://t.me/NEO_Chinese"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <SvgIcon component={Telegram} className="h-2 w-2" />
            </Typography>
            <Typography
              as="a"
              href="https://twitter.com/neo_blockchain"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <SvgIcon component={Twitter} className="h-2 w-2" />
            </Typography>
            <Typography
              as="a"
              href="https://discord.com/invite/rvZFQ5382k"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <SvgIcon component={Discord} className="h-2 w-2" />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
