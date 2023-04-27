import { FC } from "react";
import ImageHolder from "./ImageHolder";
import InstallButton from "./InstallButton";

interface TopBarProps {
  className?: string;
  onClickIcon?: () => void;
  openModal: () => void;
}

const TopBar: FC<TopBarProps> = ({ className = "", onClickIcon, openModal }) => {
  return (
    <div
      className={`bg-[#ecd9cb]/80 backdrop-blur-xl w-full flex items-center justify-between text-sm fixed drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] z-10 ${className}`}
    >
      {/* Logo and title */}
      <div
        className="bg-white p-4 w-fit flex items-center gap-2.5 cursor-pointer"
        onClick={onClickIcon}
      >
        <ImageHolder
          heightAndWidthClasses="h-5 w-5"
          src="/images/bytes_logo.png"
          alt="Bytes logo"
          priority={true}
          loadingIconColor="black"
          showLoading
        />
        <span className="tracking-[0.1em]">Bytes</span>
      </div>
      <div className="flex">
        {/* Install button */}
        <InstallButton>
          <div className="bg-[#ecd9cb] p-4 min-h-full w-fit flex items-center gap-2 cursor-pointer">
            <ImageHolder
              heightAndWidthClasses="h-5 w-5 sm:h-4 sm:w-4"
              heightAndWidthClassesForLoadingIcon="h-5 w-5"
              src="/images/svg/download.svg"
              alt="download icon"
              priority={true}
              loadingIconColor="black"
              showLoading
            />
            <span className="hidden sm:block">Install</span>
          </div>
        </InstallButton>
        {/* Info button */}
        <div className="bg-white backdrop-blur-md p-4 min-h-full w-fit flex items-center gap-2 cursor-pointer" onClick={openModal}>
          <ImageHolder
            heightAndWidthClasses="h-5 w-5 sm:h-4 sm:w-4"
            heightAndWidthClassesForLoadingIcon="h-5 w-5"
            src="/images/svg/info.svg"
            alt="info icon"
            priority={true}
            loadingIconColor="white"
            showLoading
          />
          <span className="hidden sm:block">Info</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
