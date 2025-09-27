import styles from "./styles.module.css";
import config from "../../config";

const Oauth = () => {
  const handleOAuthLogin = (provider) => {
    const apiUrl = config.apiUrl;
    if (provider === 'google') {
      window.location.href = `${apiUrl}/api/auth/google`;
    } else if (provider === 'github') {
      window.location.href = `${apiUrl}/api/auth/github`;
    }
  };

  return (
    <div className={styles.oauth_container}>
      <button
        onClick={() => handleOAuthLogin("google")}
        className={styles.oauth_button}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Logo" 
          className={styles.oauth_icon}
        />
        Continue with Google
      </button>
      
      <button
        onClick={() => handleOAuthLogin("github")}
        className={styles.oauth_button}
      >
        <img 
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo" 
          className={styles.oauth_icon}
        />
        Continue with GitHub
      </button>
    </div>
  );
};

export default Oauth;
