import Vue from 'vue'
import { getAuth, signInWithCustomToken, User } from 'firebase/auth'
import Component from 'vue-class-component'

// The @Component decorator indicates the class is a Vue component
@Component
export default class MyComponent extends Vue {
    auth = getAuth();
    loading = true;
    canceled = false;
    error: string | null = null;
}