/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function (initialState: InitialState) {
  const canUser = !!initialState.loginUser;
  const canAdmin = initialState.loginUser && initialState.loginUser.userRole === 'admin';

  return {
    canUser,
    canAdmin,
  };
}
