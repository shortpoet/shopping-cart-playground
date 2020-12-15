import { EntityNames } from '../src/interfaces/EntityNames';
import {promises as fs} from 'fs';
import path from 'path';
describe('enum names', () => {
  test('it contains all the entities', async (done) => {
    const filenames = (await fs.readdir(path.join(__dirname, '../src/api/entity')))
      .map(file => file.replace('.ts', ''));
    const allFilesInEnum = filenames.every(filename => EntityNames[filename as EntityNames] == filename);
    expect(allFilesInEnum).toBe(true);
    done()
  })
})