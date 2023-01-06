import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState } from "store/auth/userSlice";
import { apiSignIn, apiSignOut, apiSignInAuth } from "services/AuthService";
import { onSignInSuccess, onSignOutSuccess } from "store/auth/sessionSlice";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useSelector((state) => {
    // console.log("🚀 ~ useAuth ~ state", state)
    return state.auth.session;
  });
  const signIn = async ({ userName, email, password }) => {
    try {
      const resp = await apiSignInAuth({ email, password });
      if (resp.data) {
        const { token } = resp.data;
        dispatch(onSignInSuccess(token));
        if (resp.data.user) {
          dispatch(
            setUser(
              resp.data.user || {
                email: "",
                password: "",
              }
            )
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }

    // try {
    //   const resp = await apiSignInAuth({ email, password });
    //   if (resp.data) {
    //     const { token } = resp.data;
    //     dispatch(onSignInSuccess(token));
    //     if (resp.data.user) {
    //       dispatch(
    //         setUser(
    //           resp.data.user || {
    //             email: "",
    //             password: "",
    //           }
    //         )
    //       );
    //     }
    //     const redirectUrl = query.get(REDIRECT_URL_KEY);
    //     navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
    //     return {
    //       status: "success",
    //       message: "",
    //     };
    //   }
    // } catch (errors) {
    //   return {
    //     status: "failed",
    //     message: errors?.response?.data?.message || errors.toString(),
    //   };
    // }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    try {
      await apiSignOut();
      handleSignOut();
    } catch (errors) {
      handleSignOut();
    }
  };

  return {
    authenticated: signedIn,
    // authenticated: apiSignInAuth,
    signIn,
    signOut,
  };
}

export default useAuth;
