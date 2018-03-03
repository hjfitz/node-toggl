import { create } from 'axios';
import { parse } from 'crypto-js/enc-utf8';
import base64 from 'crypto-js/enc-base64';

export class Toggl {

  /**
   * Toggl API wrapper
   * @param {string} auth auth token
   */
  constructor(auth) {
    this.net = create({
      baseURL: 'https://www.toggl.com/api/v8/time_entries',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
    })
  }

  /**
   * Get the 9 most recent timer entries
   * @return {Promise<object>}
   */
  getCurrentTimers() {
    return this.net.get();
  }

  /**
   * Get the most recent timer entry
   * @return {Promise<object>}
   */
  getCurrentTimer() {
    return this.net.get('/current');
  }

  /**
   * Stop a toggl timer, given it's ID
   * @param {number} id timer id
   * @return {Promise<object>}
   */
  async stopTimer(id) {
    try {
      const data = await toggl.put(`/${id}/stop`);
      return data;
    } catch (err) {
      return {
        status: 'error',
        error: `${id} not running`,
        err,
      };
    }
  }


  /**
   * If there's an timer running
   * @return {Promise<object>}
   */
  async stopCurrentTimer() {
    const { data: entries } = await this.getCurrentTimer();
    const { id } = entries[entries.length - 1];
    return this.stopTimer(id);
  }

  /**
   * begin a timer
   * @param {object} opts entry metadata
   */
  async startTimer(opts) {
    if (!Object.keys(opts).length) {
      throw new Error('Cannot create empty timer');
    } else {
      return this.net.post('/start', opts);
    }
  }
}

/**
 * encode a stirng for use as basic auth
 * @param {string} str item to encode
 * @return {string} base64 basic auth token
 */
function encToken(str) {
  const parsed = parse(str);
  const enc = base64.stringify(parsed);
  return enc;
}

/**
 * validate args then create a toggl client
 * @param {object} opts options
 * @return {Toggl} toggl client
 */
export function createClient(opts) {
  let auth;
  if (opts.token) {
    auth = encToken(`${opts.token}:api_token`);
  } else if (opts.username && opts.password) {
    auth = encToken(`${opts.username}:${opts.password}`);
  } else {
    throw new Error('Error! Supply username/password or api token');
    process.exit(1); // fail violently
  }
  return new Toggl(auth);
}