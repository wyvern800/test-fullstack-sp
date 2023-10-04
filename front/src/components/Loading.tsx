import { ReactElement } from "react";
import { Oval } from "react-loader-spinner";

const Loading = (): ReactElement => {
  return (
    <Oval
      height={80}
      width={80}
      color="#055c9d"
      wrapperStyle={{}}
      wrapperClass=""
      ariaLabel="oval-loading"
      secondaryColor="#055c9d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loading;
