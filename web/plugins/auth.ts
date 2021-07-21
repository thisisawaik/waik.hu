export default function ({ $auth }) {
    if (!$auth.loggedIn) {
      return
    }
  
    const username = $auth.user.username
    console.log(username);
  }
  