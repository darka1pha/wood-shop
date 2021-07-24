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
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const CurrentUser = useSelector(selectCurrentUser);

      if (CurrentUser) {
        Router.replace("/profile");
        return null;
      }


      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withUser;

// const WithUser = (WrapComponent) => {
//   const PrivateComponent = ({ ...otherProps }) => {
//     const CurrentUser = useSelector(selectCurrentUser);
//     const router = useRouter();
//     if (CurrentUser && typeof window !== "undefined") {
//       router.replace("/profile");
//       return <Profile />
//     }
//     return <WrapComponent {...otherProps} />;
//   };

//   return PrivateComponent;
// };

// export default WithUser;

// const withUser = WrapComponent => {
//   const Auth = (props) => {
//     // Login data added to props via redux-store (or use react context for example)
//     const CurrentUser = useSelector(selectCurrentUser);
//     const router = useRouter();

//     // If user is not logged in, return login component
//     if (CurrentUser && typeof window !== "undefined") {
//       router.replace("/profile");
//       return (
//         <Profile />
//       );
//     }

//     // If user is logged in, return original component
//     return (
//       <WrapComponent {...props} />
//     );
//   };

//   // Copy getInitial props so it will run as well
//   if (WrapComponent.getInitialProps) {
//     Auth.getInitialProps = WrapComponent.getInitialProps;
//   }

//   return Auth;
// };

// export default withUser;
