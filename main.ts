import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import axios, { AxiosError } from 'axios';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

function fetchPage(url: string): Promise<string | undefined> {
  const HTMLData = axios
    .get(url)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      console.error(`There was an error with ${error?.config?.url!}.`);
      console.error(error.toJSON());
    });

  return HTMLData;
}

async function fetchFromWebOrCache(url: string, ignoreCache = false) {
  // If the cache folder doesn't exist, create it
  if (!existsSync(resolve(__dirname, '.cache'))) {
    mkdirSync('.cache');
  }
  console.log(`Getting data for ${url}...`);
  if (
    !ignoreCache &&
    existsSync(
      resolve(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`),
    )
  ) {
    console.log(`I read ${url} from cache`);
    const HTMLData = await readFile(
      resolve(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`),
      { encoding: 'utf8' },
    );
    const dom = new JSDOM(HTMLData);
    return dom.window.document;
  } else {
    console.log(`I fetched ${url} fresh`);
    const HTMLData = await fetchPage(url);
    if (!ignoreCache && HTMLData) {
      writeFile(
        resolve(
          __dirname,
          `.cache/${Buffer.from(url).toString('base64')}.html`,
        ),
        HTMLData,
        { encoding: 'utf8' },
      );
    }
    const dom = new JSDOM(HTMLData);
    console.log(HTMLData);
    return dom.window.document;
  }
}

function extractData(document: Document) {
  console.log('Extracting data...')

  const writingLinks: HTMLDivElement[] = Array.from(
    document.querySelectorAll('td > div'),
  );

  writingLinks.forEach((link) => {
    const text = link.id
    console.log("a:", text);
  })

  const returnData: any[] = [];

  writingLinks.forEach((link) => {
    const text = link.textContent;
    if (text) {
      returnData.push({
        rank: text,
      });
    }
  })

  return returnData;
}

function saveData(filename: string, data: any) {
  console.log(`Saving data to ${filename}.json`)
  if (!existsSync(resolve(__dirname, 'data'))) {
    mkdirSync('data');
  }
  writeFile(resolve(__dirname, `data/${filename}.json`), JSON.stringify(data), {
    encoding: 'utf8',
  });
}

async function getData() {
  const document = await fetchFromWebOrCache(
    'https://es.sudoku-online.net/get?difficulty=normal',
    true,
  );
  const data = extractData(document);
  saveData('hacker-news-links', data);
}

getData();