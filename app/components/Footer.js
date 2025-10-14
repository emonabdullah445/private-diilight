import { Button } from "@mui/material";

function Footer() {
  const links = [
    // "Contact PrivateDelights",
    "Blog",
    "Twitter",
    "Locations",
    "Privacy Policy",
    "Terms",
  ];

  return (
    <div className="bg-custom-gray  mx-auto lg:px-[404px] pt-[64px] pb-[63px] lg:pb-[59px] items-center">
      <div className=" flex flex-col lg:flex-row justify-between items-center text-custom-indigo text-[16.8px]">
        <p className="text-center cursor-pointer">
          Contact <span className="lg:block"> PrivateDelights</span>
        </p>
        {links.map((link, i) => (
          <p key={i} className="cursor-pointer">
            {link}
          </p>
        ))}
      </div>
      <div className="hidden md:block fixed md:bottom-[90px] lg:bottom-[110px] right-5">
        <Button
          variant="contained"
          // color="primary"
          // disableElevation
          className="bg-custom-indigo px-[15px] py-[8px] text-sm capitalize rounded-sm"
        >
          HELP/FEEDBACK
        </Button>
      </div>

      <p className="mt-[22px] text-center text-[16.8px] text-black/90">
        © 2022 PrivateDelights.ch
      </p>
    </div>
  );
}

export default Footer;
