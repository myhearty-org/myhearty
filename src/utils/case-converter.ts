import camelizeString from 'lodash/camelCase';
import snakeizeString from 'lodash/snakeCase';

// Typically for HTTP payloads
// @ts-ignore
export function snakeizeObject(object) {
  const snakeCaseObject = {};
  const snakeCaseArray = [];

  if (!object) return null;

  if (Array.isArray(object)) {
    for (const item of object) {
      if (typeof item === 'object') {
        snakeCaseArray.push(snakeizeObject(item));
      } else {
        snakeCaseArray.push(item);
      }
    }
    return snakeCaseArray;
  } else if (typeof object === 'object') {
    for (const key of Object.keys(object)) {
      if (typeof object[key] === 'object') {
        // @ts-ignore
        snakeCaseObject[snakeizeString(key)] = snakeizeObject(object[key]);
      } else {
        // @ts-ignore
        snakeCaseObject[snakeizeString(key)] = object[key];
      }
    }
    return snakeCaseObject;
  } else {
    return object;
  }
}

// Typically for HTTP response bodies
// @ts-ignore
export function camelizeObject(object, whitelist = []) {
  const camelCaseObject: any = {};
  const camelCaseArray: any[] = [];

  if (!object) return null;

  if (Array.isArray(object)) {
    for (const item of object) {
      if (typeof item === 'object') {
        camelCaseArray.push(camelizeObject(item));
      } else {
        camelCaseArray.push(item);
      }
    }
    return camelCaseArray;
  } else if (typeof object === 'object') {
    for (const key of Object.keys(object)) {
      // @ts-ignore
      if (whitelist.length > 0 && whitelist.indexOf(key) >= 0) {
        // @ts-ignore
        camelCaseObject[key] = object[key];
      } else if (typeof object[key] === 'object') {
        camelCaseObject[camelizeString(key)] = camelizeObject(object[key]);
      } else {
        camelCaseObject[camelizeString(key)] = object[key];
      }
    }
    return camelCaseObject;
  } else {
    return object;
  }
}
