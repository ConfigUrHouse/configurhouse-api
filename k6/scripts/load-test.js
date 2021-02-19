import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '5m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {
  const BASE_URL = 'http://localhost:7000';

  let clients = http
    .get(`${BASE_URL}/users`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .json();
  check(clients, {
    'retrieved users': (obj) => obj.length > 0,
  });

  sleep(1);
};
