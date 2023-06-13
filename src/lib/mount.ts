import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
export const axios = setupCache(Axios);

import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
 
inject({ mode: dev ? 'development' : 'production' });