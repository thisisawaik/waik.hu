import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
const app = initializeApp(environment.firebaseConfig);
export { app };