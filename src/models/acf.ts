import { IAcf } from '../types/cliente';
import mysql from './connection';

class AcfRepository {
  private repository = mysql;

  async find() {
    const [acf]: [IAcf[]] = await this.repository.execute(`
      SELECT
        id,
        sto
      FROM
        exitoinf.acf;
   `);

    return acf;
  }
}
export default AcfRepository;
