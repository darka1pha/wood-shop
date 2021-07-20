import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Profile from "../../pages/profile";

const selectCurrentUser = createSelector(
  (state: any) => state.user,
  (user: any) => user.currentUser
);

const WithUser = (WrapComponent) => {
  const PrivateComponent = ({ ...otherProps }) => {
    const CurrentUser = useSelector(selectCurrentUser);
    const router = useRouter();
    if (CurrentUser && typeof window !== "undefined") {
      router.replace("/profile");
      return <Profile />
    }
    return <WrapComponent {...otherProps} />;
  };

  return PrivateComponent;
};

export default WithUser;
