import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Signin from "../../pages/auth/signin";

const selectCurrentUser = createSelector(
  (state: any) => state.user,
  (user: any) => user.currentUser
);

const withNoUser = (WrappedComponent) => {
  return (props) => {
    const CurrentUser = useSelector(selectCurrentUser);
    const router = useRouter();
    if (!CurrentUser) {
      router.push("/auth/signin");
      return <Signin />;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default withNoUser;
