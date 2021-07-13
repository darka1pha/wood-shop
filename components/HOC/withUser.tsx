import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Profile from "../../pages/profile";

const selectCurrentUser = createSelector(
  (state: any) => state.user,
  (user: any) => user.currentUser
);

const withUser = (WrappedComponent) => {
  return (props) => {
    const CurrentUser = useSelector(selectCurrentUser);
    const router = useRouter();
    if (CurrentUser) {
      router.push("/profile");
      return <Profile />;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default withUser;
