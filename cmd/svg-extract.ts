import path from 'path';
import fs from 'fs/promises';
import { readdir } from 'fs/promises';
import { upperFirst, camelCase } from 'lodash';
import format from 'xml-formatter';
import PromisePool from 'es6-promise-pool';
import { REPO_DIR } from './constants';

type TMIcon = {
  name: string;
  category: string;
  path: string;
  svg: string;
};

const writeFile = async (icon: TMIcon, root: string) => {
  //console.log(icon.name);
  const content = tsx(icon);
  await fs.writeFile(path.resolve(`${root}/${icon.name}.tsx`), content);
};

const writeIndex = async (icons: TMIcon[], root: string) => {
  const files = icons.map((i) => `export * from './${i.name}';`);
  const content = files.join('\n') + '\n';
  //console.log('index.ts\n', content);
  await fs.writeFile(path.resolve(`${root}/index.ts`), content);
};

const tsx = ({ name, svg, ...icon }: TMIcon) => {
  const pretty = format(svg, { indentation: '  ' }).split('\n').join('\n  ');

  return `// fontawesome/svgs/${icon.path}
import { createSvgIcon } from './createSvgIcon';

export const ${name} = createSvgIcon(
  \`${pretty}\`
);

`;
};

const prefix = 'materialicons';
async function main() {
  const icons: TMIcon[] = [];

  const directory = path.resolve(path.join(REPO_DIR, 'svgs'));
  const categories = await readdir(directory);
  for (const category of categories) {
    const categoryDir = path.resolve(directory, category);
    if (!(await fs.stat(categoryDir)).isDirectory()) {
      continue;
    }

    const files = await readdir(categoryDir);
    for (const name of files) {
      const baseName = path.basename(name, '.svg');
      const ComponentName: string = isNaN(+name.charAt(0)) 
        ? `Svg${upperFirst(camelCase(baseName))}`
        : `Svg${camelCase(baseName)}`;

      const icon: TMIcon = {
        name: ComponentName,
        category,
        path: path.join(category, name),
        svg: '',
      };
      const f = path.resolve(path.join(categoryDir, name));
      icon.svg = await fs.readFile(f, { encoding: 'utf-8' });
      icons.push(icon);
    }
  }

  const ROOT = 'icons';

  const generatePromises = function* () {
    for (const icon of icons) {
      yield writeFile(icon, ROOT);
    }
  };
  const iterator: any = generatePromises();
  const pool = new PromisePool(iterator, 3);
  await pool.start();

  writeIndex(icons, ROOT);
}

main();
