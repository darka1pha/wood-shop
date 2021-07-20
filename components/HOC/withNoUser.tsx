import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Signin from "../../pages/auth/signin";

const selectCurrentUser = createSelector(
  (state: any) => state.user,
  (user: any) => user.currentUser
);

const WithNoUser = (WrapComponent) => {
  const PrivateComponent = ({ ...otherProps }) => {
    const CurrentUser = useSelector(selectCurrentUser);
    const router = useRouter();
    if (!CurrentUser && typeof window !== "undefined") {
      router.replace("/auth/signin");
      return <Signin />
    }
    return <WrapComponent {...otherProps} />;
  };

  return PrivateComponent;
};

export default WithNoUser;
